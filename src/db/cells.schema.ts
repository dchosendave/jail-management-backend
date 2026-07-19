import { integer, pgTable, varchar, foreignKey, timestamp } from "drizzle-orm/pg-core";
import { facilities } from "./facilities.schema.js";
import { defineRelations } from "drizzle-orm";
import { inmates } from "./inmates.schema.js";
import { personnel } from "./personnel.schema.js";

export const cells = pgTable("cells", {
    cellId: integer('cell_id').primaryKey().generatedAlwaysAsIdentity(),
    facilityId: integer().references(() => facilities.facilityId).notNull(),
    cellName: varchar('cell_name', { length: 150 }).notNull(),
    type: varchar('type', { length: 30}).notNull(),
    capacity: integer('capacity').notNull(),
    status: varchar('status', { length: 20} ).notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    createdBy: integer('created_by').references(() => personnel.personnelId).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true}),
    updatedBy: integer('updated_by').references(() => personnel.personnelId)
});

export const cellAssignments = pgTable('cell_assignments', {
    cellAssignmentId: integer('cell_assignment_id').primaryKey().generatedAlwaysAsIdentity(),
    inmateId: integer('inmate_id').references(() => inmates.inmateId).notNull(),
    cellId: integer('cell_id').references(() => cells.cellId).notNull(),
    assignedAt: timestamp('assigned_at', { withTimezone: true }).notNull().defaultNow(),
    assignedBy: integer('assigned_by').references(() => personnel.personnelId).notNull(),
    reassignedAt: timestamp('reassigned_at', { withTimezone: true }),
    reassignedBy: integer('relieved_by').references(() => personnel.personnelId)
});

export const cellRelations = defineRelations({ facilities, cells }, (r) => ({
    facilities: {
        cells: r.many.cells()
    },
    cells: {
        facility: r.one.facilities({
            from: r.cells.facilityId,
            to: r.facilities.facilityId
        })
    }
}));