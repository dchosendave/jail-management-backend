import express, { type Request, type Response, type NextFunction } from 'express';
import * as z from "zod";

export const validateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).send({
            errors: z.prettifyError(result.error)
        });
    }

    req.body = result.data; // clean the req.body after parsing

    next();
}
