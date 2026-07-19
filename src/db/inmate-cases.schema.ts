import * as p from 'drizzle-orm/pg-core';
import { inmates } from './inmates.schema.js';
import { cases } from './cases.schema.js';
import { personnel } from './personnel.schema.js';

export const inmateCases = p.pgTable('inmate_cases', {
    inmateCaseId: p.integer('inmate_case_id').primaryKey().generatedAlwaysAsIdentity(),
    inmateId: p.integer('inmate_id').references(() => inmates.inmateId).notNull(),
    caseId: p.integer('case_id').references(() => cases.caseId).notNull(),
    createdAt: p.timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: p.integer('created_by').references(() => personnel.personnelId).notNull(),
    updatedAt: p.timestamp('updated_at', { withTimezone: true}),
    updatedBy: p.integer('updated_by').references(() => personnel.personnelId)
});