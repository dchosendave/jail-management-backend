import { type Request, type Response } from 'express';
import { db } from '../connection.js';
import * as z from 'zod';
import type { Personnel } from './personnel.schemas.js';

export async function createPersonnel(req: Request, res: Response) {
    const body = req.body as Personnel;

    return res.status(500).send({ message: 'not yet implemented'});
}

export async function getPersonnelById(req: Request, res: Response) {
    return res.status(500).send({ message: 'not yet implemented'});
}

export async function getAllPersonnel(req: Request, res: Response){
    return res.status(500).send({ message: 'not yet implemented'});
}

export async function updatePersonnel(req: Request, res: Response){
    return res.status(500).send({ message: 'not yet implemented'});
}
