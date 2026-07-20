import * as p from 'drizzle-orm/pg-core';
import { committingCourts } from './committing-courts.schema.js';
import { users } from './users.schema.js';

export const cases = p.pgTable('cases', {
    caseId: p.integer('case_id').primaryKey().generatedAlwaysAsIdentity(),
    caseNumber: p.varchar('case_number', { length: 50}).notNull().unique(),
    caseTitle: p.varchar('case_title', { length: 200 }),
    committingCourtId: p.integer('committing_court_id').references(() => committingCourts.committingCourtId).notNull(),
    offenseCharged: p.varchar('offense_charged', { length: 255}).notNull(),
    offenseCategory: p.varchar('offense_category', { length: 50 }),
    status: p.varchar('status', { length: 30 }).notNull().default('pending'),
    dateFiled: p.date('date_filed'),
    createdAt: p.timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: p.integer('created_by').references(() => users.userId).notNull(),
    updatedAt: p.timestamp('updated_at', { withTimezone: true}),
    updatedBy: p.integer('updated_by').references(() => users.userId)
});