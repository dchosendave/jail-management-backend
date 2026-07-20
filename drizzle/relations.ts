import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

export const relations = defineRelations(schema, (r) => ({
	bookings: {
		committingCourt: r.one.committingCourts({
			from: r.bookings.committingCourtId,
			to: r.committingCourts.committingCourtId
		}),
		userCreatedBy: r.one.users({
			from: r.bookings.createdBy,
			to: r.users.userId,
			alias: "bookings_createdBy_users_userId"
		}),
		facility: r.one.facilities({
			from: r.bookings.facilityId,
			to: r.facilities.facilityId
		}),
		inmate: r.one.inmates({
			from: r.bookings.inmateId,
			to: r.inmates.inmateId
		}),
		personnel: r.one.personnel({
			from: r.bookings.receivingOfficerId,
			to: r.personnel.personnelId
		}),
		userUpdatedBy: r.one.users({
			from: r.bookings.updatedBy,
			to: r.users.userId,
			alias: "bookings_updatedBy_users_userId"
		}),
	},
	committingCourts: {
		bookings: r.many.bookings(),
		cases: r.many.cases(),
	},
	users: {
		bookingsCreatedBy: r.many.bookings({
			alias: "bookings_createdBy_users_userId"
		}),
		bookingsUpdatedBy: r.many.bookings({
			alias: "bookings_updatedBy_users_userId"
		}),
		casesCreatedBy: r.many.cases({
			alias: "cases_createdBy_users_userId"
		}),
		casesUpdatedBy: r.many.cases({
			alias: "cases_updatedBy_users_userId"
		}),
		cellAssignmentsAssignedBy: r.many.cellAssignments({
			alias: "cellAssignments_assignedBy_users_userId"
		}),
		cellAssignmentsReassignedBy: r.many.cellAssignments({
			alias: "cellAssignments_reassignedBy_users_userId"
		}),
		cellsCreatedBy: r.many.cells({
			alias: "cells_createdBy_users_userId"
		}),
		cellsUpdatedBy: r.many.cells({
			alias: "cells_updatedBy_users_userId"
		}),
		inmateCasesCreatedBy: r.many.inmateCases({
			alias: "inmateCases_createdBy_users_userId"
		}),
		inmateCasesUpdatedBy: r.many.inmateCases({
			alias: "inmateCases_updatedBy_users_userId"
		}),
		personnelAssignmentsAssignedBy: r.many.personnelAssignments({
			alias: "personnelAssignments_assignedBy_users_userId"
		}),
		personnelAssignmentsRelievedBy: r.many.personnelAssignments({
			alias: "personnelAssignments_relievedBy_users_userId"
		}),
		userCreatedBy: r.one.users({
			from: r.users.createdBy,
			to: r.users.userId,
			alias: "users_createdBy_users_userId"
		}),
		usersCreatedBy: r.many.users({
			alias: "users_createdBy_users_userId"
		}),
		personnel: r.one.personnel({
			from: r.users.personnelId,
			to: r.personnel.personnelId
		}),
		userUpdatedBy: r.one.users({
			from: r.users.updatedBy,
			to: r.users.userId,
			alias: "users_updatedBy_users_userId"
		}),
		usersUpdatedBy: r.many.users({
			alias: "users_updatedBy_users_userId"
		}),
		visitsCreatedBy: r.many.visits({
			alias: "visits_createdBy_users_userId"
		}),
		visitsOfficerOnDutyId: r.many.visits({
			alias: "visits_officerOnDutyId_users_userId"
		}),
		visitsUpdatedBy: r.many.visits({
			alias: "visits_updatedBy_users_userId"
		}),
	},
	facilities: {
		bookings: r.many.bookings(),
		cells: r.many.cells(),
		personnelAssignments: r.many.personnelAssignments(),
	},
	inmates: {
		bookings: r.many.bookings(),
		cellAssignments: r.many.cellAssignments(),
		inmateCases: r.many.inmateCases(),
		visits: r.many.visits(),
	},
	personnel: {
		bookings: r.many.bookings(),
		personnelAssignments: r.many.personnelAssignments(),
		users: r.many.users(),
		visitorsCreatedBy: r.many.visitors({
			alias: "visitors_createdBy_personnel_personnelId"
		}),
		visitorsUpdatedBy: r.many.visitors({
			alias: "visitors_updatedBy_personnel_personnelId"
		}),
		visitorsVerifiedBy: r.many.visitors({
			alias: "visitors_verifiedBy_personnel_personnelId"
		}),
	},
	cases: {
		committingCourt: r.one.committingCourts({
			from: r.cases.committingCourtId,
			to: r.committingCourts.committingCourtId
		}),
		userCreatedBy: r.one.users({
			from: r.cases.createdBy,
			to: r.users.userId,
			alias: "cases_createdBy_users_userId"
		}),
		userUpdatedBy: r.one.users({
			from: r.cases.updatedBy,
			to: r.users.userId,
			alias: "cases_updatedBy_users_userId"
		}),
		inmateCases: r.many.inmateCases(),
	},
	cellAssignments: {
		userAssignedBy: r.one.users({
			from: r.cellAssignments.assignedBy,
			to: r.users.userId,
			alias: "cellAssignments_assignedBy_users_userId"
		}),
		cell: r.one.cells({
			from: r.cellAssignments.cellId,
			to: r.cells.cellId
		}),
		inmate: r.one.inmates({
			from: r.cellAssignments.inmateId,
			to: r.inmates.inmateId
		}),
		userReassignedBy: r.one.users({
			from: r.cellAssignments.reassignedBy,
			to: r.users.userId,
			alias: "cellAssignments_reassignedBy_users_userId"
		}),
	},
	cells: {
		cellAssignments: r.many.cellAssignments(),
		userCreatedBy: r.one.users({
			from: r.cells.createdBy,
			to: r.users.userId,
			alias: "cells_createdBy_users_userId"
		}),
		facility: r.one.facilities({
			from: r.cells.facilityId,
			to: r.facilities.facilityId
		}),
		userUpdatedBy: r.one.users({
			from: r.cells.updatedBy,
			to: r.users.userId,
			alias: "cells_updatedBy_users_userId"
		}),
	},
	inmateCases: {
		case: r.one.cases({
			from: r.inmateCases.caseId,
			to: r.cases.caseId
		}),
		userCreatedBy: r.one.users({
			from: r.inmateCases.createdBy,
			to: r.users.userId,
			alias: "inmateCases_createdBy_users_userId"
		}),
		inmate: r.one.inmates({
			from: r.inmateCases.inmateId,
			to: r.inmates.inmateId
		}),
		userUpdatedBy: r.one.users({
			from: r.inmateCases.updatedBy,
			to: r.users.userId,
			alias: "inmateCases_updatedBy_users_userId"
		}),
	},
	personnelAssignments: {
		userAssignedBy: r.one.users({
			from: r.personnelAssignments.assignedBy,
			to: r.users.userId,
			alias: "personnelAssignments_assignedBy_users_userId"
		}),
		facility: r.one.facilities({
			from: r.personnelAssignments.facilityId,
			to: r.facilities.facilityId
		}),
		personnel: r.one.personnel({
			from: r.personnelAssignments.personnelId,
			to: r.personnel.personnelId
		}),
		userRelievedBy: r.one.users({
			from: r.personnelAssignments.relievedBy,
			to: r.users.userId,
			alias: "personnelAssignments_relievedBy_users_userId"
		}),
	},
	visitors: {
		personnelCreatedBy: r.one.personnel({
			from: r.visitors.createdBy,
			to: r.personnel.personnelId,
			alias: "visitors_createdBy_personnel_personnelId"
		}),
		personnelUpdatedBy: r.one.personnel({
			from: r.visitors.updatedBy,
			to: r.personnel.personnelId,
			alias: "visitors_updatedBy_personnel_personnelId"
		}),
		personnelVerifiedBy: r.one.personnel({
			from: r.visitors.verifiedBy,
			to: r.personnel.personnelId,
			alias: "visitors_verifiedBy_personnel_personnelId"
		}),
		visits: r.many.visits(),
	},
	visits: {
		userCreatedBy: r.one.users({
			from: r.visits.createdBy,
			to: r.users.userId,
			alias: "visits_createdBy_users_userId"
		}),
		inmate: r.one.inmates({
			from: r.visits.inmateId,
			to: r.inmates.inmateId
		}),
		userOfficerOnDutyId: r.one.users({
			from: r.visits.officerOnDutyId,
			to: r.users.userId,
			alias: "visits_officerOnDutyId_users_userId"
		}),
		userUpdatedBy: r.one.users({
			from: r.visits.updatedBy,
			to: r.users.userId,
			alias: "visits_updatedBy_users_userId"
		}),
		visitor: r.one.visitors({
			from: r.visits.visitorId,
			to: r.visitors.visitorId
		}),
	},
}))