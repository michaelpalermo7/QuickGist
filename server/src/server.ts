import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
});

app.listen(5001, () => {
    console.log('Server started on port 5001.');
});