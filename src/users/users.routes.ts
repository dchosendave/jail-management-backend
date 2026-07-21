import express from 'express';
import { createUser, getUser, getUsers } from './users.handlers.js';
import { validateBody } from '@/shared/validate-body.js';
import { UsersSchema } from './users.schemas.js';

const router = express.Router();

router.post('/', validateBody(UsersSchema), createUser);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;