import { integer, varchar, pgTable, date, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { facilities } from './facilities.schema.js';

export const personnel = pgTable('personnel', {
    personnelId: integer('personnel_id').primaryKey().generatedAlwaysAsIdentity(),
    employeeNumber: varchar('employee_number', { length: 30 }).notNull(),
    firstName: varchar('first_name', { length: 60 }).notNull(),
    middleName: varchar('middle_name', { length: 60 }),
    lastName: varchar('last_name', { length: 60 }).notNull(),
    suffix: varchar('suffix', { length: 10 }),
    rank: varchar('rank', { length: 50 }),
    designation: varchar('designation', { length: 100 }),
    badgeNumber: varchar('badge_number', { length: 20 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    contactNumber: varchar('contact_number', { length: 30 }),
    dateOfBirth: date('date_of_birth').notNull(),
    dateHired: date('date_hired').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: integer('created_by').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true}),
    updatedBy: integer('updated_by')
}, (table) => [
    foreignKey({
        columns: [table.createdBy],
        foreignColumns: [table.personnelId],
        name: 'personnel_created_by_fk'
    }),
    foreignKey({
        columns: [table.updatedBy],
        foreignColumns: [table.personnelId],
        name: 'personnel_updated_by_fk'
    })
]);

export const personnelAssignments = pgTable('personnel_assignments', {
    personnelAssignmentId: integer('personnel_assignment_id').primaryKey().generatedAlwaysAsIdentity(),
    personnelId: integer('personnel_id').references(() => personnel.personnelId).notNull(),
    facilityId: integer('facility_id').references(() => facilities.facilityId).notNull(),
    assignedAt: timestamp('assigned_at', { withTimezone: true }).notNull().defaultNow(),
    assignedBy: integer('assigned_by').references(() => personnel.personnelId).notNull(),
    relievedAt: timestamp('relieved_at', { withTimezone: true }),
    relievedBy: integer('relieved_by').references(() => personnel.personnelId)
});