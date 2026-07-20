import { boolean, date, foreignKey, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { personnel } from './personnel.schema.js';
import { users } from './users.schema.js';

export const facilities = pgTable("facilities", {
    facilityId: integer('facility_id').primaryKey().generatedAlwaysAsIdentity(),
    facilityName: varchar('facility_name', { length: 150 }).notNull(),
    type: varchar('type', { length: 50}).notNull(),
    capacity: integer('capacity').notNull(),
    addressLine: varchar('address_line', { length: 255 }),
    regionId: integer('region_id').notNull(),
    provinceId: integer('province_id').notNull(),
    cityMunicipalityId: integer('city_municipality_id').notNull(),
    barangayId: integer('barangay_id').notNull(),
    contactNumber: varchar('contact_number', { length: 30} ),
    status: boolean('status').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: integer('created_by').references(() => users.userId).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true}),
    updatedBy: integer('updated_by').references(() => users.userId)
});