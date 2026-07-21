import { type Request, type Response, type NextFunction } from 'express';
import { db } from '../db/connection.js';
import * as z from 'zod';
import { UsersSchema } from './users.schemas.js';
import bcrypt from 'bcrypt';
import { personnel, users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm/sql';

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
    } as typeof users.$inferInsert).returning({ email: users.email });

    return res.status(201).send({ message: `Welcome to ${result?.email}` });
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
    }).from(users).innerJoin(personnel, eq(users.personnelId, personnel.personnelId)).where(eq(users.userId, userId));

    if (result.length === 0) {
        return res.status(404).send({ message: 'resource not found. ' });
    }

    return res.status(201).send({ data: result });
}

export async function getUsers(req: Request, res: Response) {
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
    }).from(users).innerJoin(personnel, eq(users.personnelId, personnel.personnelId));

    if (result.length === 0) {
        return res.status(404).send({ message: 'resource not found. ' });
    }

    return res.status(201).send({ data: result });
}