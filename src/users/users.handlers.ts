import { type Request, type Response, type NextFunction } from 'express';
import { db } from '../db/connection.js';
import * as z from 'zod';
import { UsersSchema } from './users.schemas.js';
import bcrypt from 'bcrypt';
import { users } from '../../drizzle/schema.js';

export async function createUser(req: Request, res: Response) {
    const body = req.body as z.infer<typeof UsersSchema>;

    const existing = await db.query.users.findFirst({
        where: {
            personnelId: body.personnelId
        }
    });

    if (existing) {
        return res.status(409).send({ message: 'resource already exists.' });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);


    const [result] = await db.insert(users).values({
        personnelId: body.personnelId,
        email: body.email,
        passwordHash,
        status: body.status ?? 'active',
        lastLoginAt: null,
        createdBy: 1,
        updatedAt: null,
        updatedBy: null
    } as typeof users.$inferInsert).returning({ insertedId: users.userId});

    return res.status(201).send({ message: 'Resource created.', newId: result });
}

export async function getUser(req: Request, res: Response) {

}

export async function getUsers(req: Request, res: Response) {

}