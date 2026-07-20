import * as p from 'drizzle-orm/pg-core';
import { inmates } from './inmates.schema.js';
import { visitors } from './visitors.schema.js';
import { users } from './users.schema.js';

export const visits = p.pgTable('visits', {
    visitId: p.integer('visit_id').primaryKey().generatedAlwaysAsIdentity(),
    inmateId: p.integer('inmate_id').references(() => inmates.inmateId).notNull(),
    visitorId: p.integer('visitor_id').references(() => visitors.visitorId).notNull(),
    visitDate: p.date('visit_date').notNull(),
    timeIn: p.time('time_in'),
    timeOut: p.time('time_out'),
    purpose: p.varchar('purpose', { length: 100 }),
    itemsBrought: p.text('items_brought'),
    officerOnDutyId: p.integer('officer_on_duty_id').references(() => users.userId).notNull(),
    remarks: p.text('remarks'),
    createdAt: p.timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: p.integer('created_by').references(() => users.userId).notNull(),
    updatedAt: p.timestamp('updated_at', { withTimezone: true}),
    updatedBy: p.integer('updated_by').references(() => users.userId)
});