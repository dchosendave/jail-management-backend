import { integer, pgTable, varchar, foreignKey, timestamp } from "drizzle-orm/pg-core";
import { facilities } from "./facilities.schema.js";
import { defineRelations } from "drizzle-orm";
import { inmates } from "./inmates.schema.js";

export const cells = pgTable("cells", {
    cellId: integer('cell_id').primaryKey().generatedAlwaysAsIdentity(),
    facilityId: integer().references(() => facilities.facilityId).notNull(),
    cellName: varchar('cell_name', { length: 150 }).notNull(),
    type: varchar('type', { length: 30}).notNull(),
    capacity: integer('capacity').notNull(),
    status: varchar('status', { length: 20} ).notNull().default('active')
});

export const cellAssignments = pgTable('cell_assignments', {
    cellAssignmentId: integer('cell_assignment_id').primaryKey().generatedAlwaysAsIdentity(),
    inmateId: integer('inmate_id').references(() => inmates.inmateId).notNull(),
    cellId: integer('cell_id').references(() => cells.cellId).notNull(),
    assignedAt: timestamp('assigned_at', { withTimezone: true }).notNull().defaultNow(),
    reassignedAt: timestamp('reassigned_at', { withTimezone: true })
});

export const relations = defineRelations({ facilities, cells }, (r) => ({
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