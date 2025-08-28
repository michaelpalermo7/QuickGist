// src/middleware/validate.ts
import type { RequestHandler } from "express";
import type { AnyZodObject, ZodError } from "zod";

export const validate =
  (
    schema: AnyZodObject,
    location: "body" | "query" | "params" = "body"
  ): RequestHandler =>
  (req, res, next): void => {
    try {
      const parsed = schema.parse((req as any)[location]);
      (req as any)[location] = parsed;
      next();
    } catch (e) {
      const zerr = e as ZodError;
      if (Array.isArray((zerr as any).errors)) {
        res.status(400).json({
          message: "Validation error",
          issues: zerr.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }
      next(e);
    }
  };
