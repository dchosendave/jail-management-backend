import { type Request, type Response, type NextFunction } from 'express';
import { db } from '../db/connection.js';
import * as z from 'zod';
import { UsersSchema } from './users.schemas.js';
import bcrypt from 'bcrypt';
import { personnel, users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm/sql';
import es from 'zod/v4/locales/es.cjs';

export async function createUser(req: Request, res: Response) {
    const body = req.body as z.infer<typeof UsersSchema>;

    try {
        const existing = await db.query.users.findFirst({
            where: {
                email: body.email
            }
        });

        if (existing) {
            return res.status(409).send({ message: 'resource already exists.' });
        }

        const passwordHash = await bcrypt.hash(body.password, 10);

        const [result] = await db.insert(users).values({
            email: body.email,
            passwordHash,
            status: body.status ?? 'active',
            lastLoginAt: null,
            createdBy: 1, // must be coming from something else
            updatedAt: null,
            updatedBy: null
        } as typeof users.$inferInsert).returning({ newUserId: users.userId, email: users.email });

        if (!result) {
            return res.status(500).send({ message: 'failed to create user' });
        }

        await db.update(personnel).set({ userId: result.newUserId }).where(eq(personnel.personnelId, body.personnelId));

        return res.status(201).send({ message: `Welcome to ${result?.email}` });
    } catch (err) {
        return res.status(500).send({ err });
    }
}

export async function getUser(req: Request, res: Response) {
    const userId = Number(req.params.id);

    const result = await db.select({
        userId: users.userId,
        personnelId: personnel.personnelId,
        firstName: personnel.firstName,
        middleName: personnel.middleName,
        lastName: personnel.lastName,
        suffix: personnel.suffix,
        rank: personnel.rank,
        designation: personnel.designation,
        badgeNumber: personnel.badgeNumber,
        email: users.email,
        contactNumber: personnel.contactNumber,
        dateOfBirth: personnel.dateOfBirth,
        dateHired: personnel.dateHired,
    }).from(users).innerJoin(personnel, eq(personnel.userId, users.userId)).where(eq(users.userId, userId));

    if (result.length === 0) {
        return res.status(404).send({ message: 'resource not found. ' });
    }

    return res.status(201).send({ data: result });
}

export async function getUsers(req: Request, res: Response) {

    try {
        const result = await db.select({
            userId: users.userId,
            personnelId: personnel.personnelId,
            firstName: personnel.firstName,
            middleName: personnel.middleName,
            lastName: personnel.lastName,
            suffix: personnel.suffix,
            rank: personnel.rank,
            designation: personnel.designation,
            badgeNumber: personnel.badgeNumber,
            email: users.email,
            contactNumber: personnel.contactNumber,
            dateOfBirth: personnel.dateOfBirth,
            dateHired: personnel.dateHired,
        }).from(users).innerJoin(personnel, eq(personnel.userId, users.userId));

        if (result.length === 0) {
            return res.status(404).send({ message: 'resource not found. ' });
        }

        return res.status(201).send({ data: result });
    } catch (err) {
        return res.status(500).send({
            err: err
        });
    }
}