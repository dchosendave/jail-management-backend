import { integer, varchar, date, time, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { inmates } from './inmates.schema.js';
import { facilities } from './facilities.schema.js';
import { committingCourts } from './committing-courts.schema.js';
import { personnel } from './personnel.schema.js';

export const bookings = pgTable('bookings', {
    bookingId: integer('booking_id').primaryKey().generatedAlwaysAsIdentity(),
    inmateId: integer('inmate_id').references(() => inmates.inmateId).notNull(),
    facilityId: integer('facility_id').references(() => facilities.facilityId).notNull(),
    bookingNumber: varchar('booking_number', { length: 30 }).notNull().unique(),
    bookingDate: date('booking_date').notNull(),
    bookingTime: time('booking_time'),
    arrestingAgency: varchar('arresting_agency', { length: 100 }),
    arrestingOfficer: varchar('arresting_officer', { length: 100 }),
    arrestingOfficerRank: varchar('arresting_officer_rank', { length: 50}),
    arrestLocation: varchar('arrest_location', { length: 150 }),
    timeOfArrest: timestamp('time_of_arrest', { withTimezone: true }),
    committingCourtId: integer('committing_court_id').references(() => committingCourts.committingCourtId).notNull(),
    committmentOrderNumber: varchar('committ_order_number', { length: 50 }),
    commitmentOrderDate: date('committment_order_date'),
    offenseCommitted: varchar('offense_commited', { length: 255 }).notNull(),
    offenseCategory: varchar('offense_category', { length: 50 }),
    receivingOfficerId: integer('receiving_officer_id').references(() => personnel.personnelId).notNull(),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: integer('created_by').references(() => personnel.personnelId).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true}),
    updatedBy: integer('updated_by').references(() => personnel.personnelId)
});