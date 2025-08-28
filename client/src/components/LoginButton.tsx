import React, { FC, ReactNode } from "react";
import Button from "@mui/material/Button";

/* Will be for user authentication */
interface LoginButtonProps {
  href: string;
  children: ReactNode;
}

export const LoginButton: FC<LoginButtonProps> = ({ href, children }) => {
  return (
    <Button
      variant="outlined"
      href={href}
      disableElevation
      sx={{
        m: 0,
        minWidth: "auto",
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 600,
        px: 3, // match SubmitButton padding
        py: 1.5, // match SubmitButton padding
        borderRadius: "8px", // match SubmitButton radius
        lineHeight: 1.2,
        color: "#fff",
        borderColor: "#fff",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#fff",
          color: "#000",
          borderColor: "#fff",
        },
      }}
    >
      {children}
    </Button>
  );
};
