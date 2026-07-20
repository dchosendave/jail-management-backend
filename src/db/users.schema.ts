import * as p from 'drizzle-orm/pg-core';
import { personnel } from './personnel.schema.js';

export const users = p.pgTable('users', {
    userId: p.integer('user_id').primaryKey().generatedAlwaysAsIdentity(),
    personnelId: p.integer('personnel_id').references(() => personnel.personnelId).notNull(),
    email: p.varchar('email', { length: 255}).notNull().unique(),
    passwordHash: p.varchar('password_hash', { length: 255}).notNull(),
    status: p.varchar('status', { length: 20}).notNull().default('active'),
    lastLoginAt: p.timestamp('last_login_at', { withTimezone: true }),
    createdAt: p.timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: p.integer('created_by').notNull(),
    updatedAt: p.timestamp('updated_at', { withTimezone: true}),
    updatedBy: p.integer('updated_by')
}, (table) => [
    p.foreignKey({
        columns: [table.createdBy],
        foreignColumns: [table.userId]
    }),
    p.foreignKey({
        columns: [table.updatedBy],
        foreignColumns: [table.userId]
    })
]);