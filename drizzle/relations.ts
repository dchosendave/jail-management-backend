import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

export const relations = defineRelations(schema, (r) => ({
	barangays: {
		citiesMunicipality: r.one.citiesMunicipalities({
			from: r.barangays.cityMunicipalityId,
			to: r.citiesMunicipalities.cityMunicipalityId
		}),
		province: r.one.provinces({
			from: r.barangays.provinceId,
			to: r.provinces.provinceId
		}),
		region: r.one.regions({
			from: r.barangays.regionId,
			to: r.regions.regionId
		}),
	},
	citiesMunicipalities: {
		barangays: r.many.barangays(),
	},
	provinces: {
		barangays: r.many.barangays(),
		regions: r.many.regions({
			from: r.provinces.provinceId.through(r.citiesMunicipalities.provinceId),
			to: r.regions.regionId.through(r.citiesMunicipalities.regionId),
			alias: "provinces_provinceId_regions_regionId_via_citiesMunicipalities"
		}),
		region: r.one.regions({
			from: r.provinces.regionId,
			to: r.regions.regionId,
			alias: "provinces_regionId_regions_regionId"
		}),
	},
	regions: {
		barangays: r.many.barangays(),
		provincesViaCitiesMunicipalities: r.many.provinces({
			alias: "provinces_provinceId_regions_regionId_via_citiesMunicipalities"
		}),
		provincesRegionId: r.many.provinces({
			alias: "provinces_regionId_regions_regionId"
		}),
	},
	bookings: {
		committingCourt: r.one.committingCourts({
			from: r.bookings.committingCourtId,
			to: r.committingCourts.committingCourtId
		}),
		facility: r.one.facilities({
			from: r.bookings.facilityId,
			to: r.facilities.facilityId
		}),
		inmate: r.one.inmates({
			from: r.bookings.inmateId,
			to: r.inmates.inmateId
		}),
	},
	committingCourts: {
		bookings: r.many.bookings(),
		cases: r.many.cases(),
	},
	facilities: {
		bookings: r.many.bookings(),
		cells: r.many.cells(),
		personnelAssignments: r.many.personnelAssignments(),
	},
	inmates: {
		bookings: r.many.bookings(),
		cells: r.many.cells(),
		cases: r.many.cases(),
		visitors: r.many.visitors({
			from: r.inmates.inmateId.through(r.visits.inmateId),
			to: r.visitors.visitorId.through(r.visits.visitorId)
		}),
	},
	cases: {
		committingCourt: r.one.committingCourts({
			from: r.cases.committingCourtId,
			to: r.committingCourts.committingCourtId
		}),
		inmates: r.many.inmates({
			from: r.cases.caseId.through(r.inmateCases.caseId),
			to: r.inmates.inmateId.through(r.inmateCases.inmateId)
		}),
	},
	cells: {
		inmates: r.many.inmates({
			from: r.cells.cellId.through(r.cellAssignments.cellId),
			to: r.inmates.inmateId.through(r.cellAssignments.inmateId)
		}),
		facility: r.one.facilities({
			from: r.cells.facilityId,
			to: r.facilities.facilityId
		}),
	},
	personnelAssignments: {
		facility: r.one.facilities({
			from: r.personnelAssignments.facilityId,
			to: r.facilities.facilityId
		}),
	},
	visitors: {
		inmates: r.many.inmates(),
	},
}))