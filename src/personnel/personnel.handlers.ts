import { type Request, type Response } from 'express';
import { db } from '../connection.js';
import * as z from 'zod';

export async function createPersonnel(req: Request, res: Response) {
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
