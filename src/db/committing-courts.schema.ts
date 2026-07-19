import  { integer, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { personnel } from './personnel.schema.js';

export const committingCourts = pgTable('committing_courts', {
    committingCourtId: integer('committing_court_id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('committing_court_name', { length: 150 }).notNull(),
    branch: varchar('branch', { length: 50 }),
    type: varchar('type', { length: 30}).notNull(),
    // cityMunicipalityId: integer('city_municipality_id')
    address: varchar('address', { length: 255}),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: integer('created_by').references(() => personnel.personnelId).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true}),
    updatedBy: integer('updated_by').references(() => personnel.personnelId)
});