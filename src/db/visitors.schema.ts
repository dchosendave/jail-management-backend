import * as p from 'drizzle-orm/pg-core';
import { personnel } from './personnel.schema.js';

export const visitors = p.pgTable('visitors', {
    visitorId: p.integer('visitor_id').primaryKey().generatedAlwaysAsIdentity(),
    firstName: p.varchar('first_name', { length: 60 }).notNull(),
    middleName: p.varchar('middle_name', { length: 60 }),
    lastName: p.varchar('last_name', { length: 60 }).notNull(),
    suffix: p.varchar('suffix', { length: 10 }),
    relationship: p.varchar('relationship', { length: 30}).notNull(),
    contactNumber: p.varchar('contact_number', { length: 30}),
    validIdType: p.varchar('valid_id_type', { length: 30 }).notNull(), // references valid_ids,
    validIdNumber: p.varchar('valid_id_number', { length: 50 }),
    verifiedAt: p.timestamp('verified_at', { withTimezone: true }),
    verifiedBy: p.integer('verified_by').references(() => personnel.personnelId).notNull(),
    createdAt: p.timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: p.integer('created_by').references(() => personnel.personnelId).notNull(),
    updatedAt: p.timestamp('updated_at', { withTimezone: true}),
    updatedBy: p.integer('updated_by').references(() => personnel.personnelId)
});