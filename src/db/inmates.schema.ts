import { integer, varchar, date, text, numeric, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { personnel } from './personnel.schema.js';
import { users } from './users.schema.js';

export const inmates = pgTable('inmates', {
    inmateId: integer('inmate_id').primaryKey().generatedAlwaysAsIdentity(),
    inmateNumber: varchar('inmate_number', { length: 20 }).notNull().unique(),
    firstName: varchar('first_name', { length: 60 }).notNull(),
    middleName: varchar('middle_name', { length: 60 }),
    lastName: varchar('last_name', { length: 60 }).notNull(),
    suffix: varchar('suffix', { length: 10 }),
    alias: varchar('alias', { length: 100 }),
    sex: varchar('sex', { length: 10 }).notNull(),
    civilStatus: varchar('civil_status', { length: 20 }),
    dateOfBirth: date('date_of_birth').notNull(),
    placeOfBirth: varchar('place_of_birth', { length: 150 }),
    nationality: varchar('nationality', { length: 50}).default('filipino'),
    religion: varchar('religion', { length: 50}),
    educationalAttainment: varchar('educational_attainment', { length: 50}),
    occupation: varchar('occupation', { length: 100 }),
    emergencyContactName: varchar('emergency_contact_name', { length: 150 }),
    emergencyContactNumber: varchar('emergency_contact_number', { length: 30 }),
    identifyingMarks: text('identifying_marks'),
    heightInCm: numeric('height_in_cm', { precision: 5, scale: 1 }),
    weightInKg: numeric('weight_in_kg', { precision: 5, scale: 1}),
    bloodType: varchar('blood_type', { length: 5}),
    status: varchar('status', { length: 20 }).notNull().default('detained'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: integer('created_by').references(() => users.userId).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true}),
    updatedBy: integer('updated_by').references(() => users.userId)
});