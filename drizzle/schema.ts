import { pgTable, integer, varchar, text, timestamp, date, time, boolean, numeric, foreignKey, type AnyPgColumn, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const barangays = pgTable("barangays", {
	barangayId: integer("barangay_id").primaryKey().generatedAlwaysAsIdentity(),
	regionId: integer("region_id").notNull().references(() => regions.regionId),
	provinceId: integer("province_id").notNull().references(() => provinces.provinceId),
	cityMunicipalityId: integer("city_municipality_id").notNull().references(() => citiesMunicipalities.cityMunicipalityId),
	psgcCode: varchar("psgc_code", { length: 255 }).notNull(),
	barangayCode: varchar("barangay_code", { length: 10 }).notNull(),
	barangayDescription: text("barangay_description").notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	updatedBy: integer("updated_by").references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const bookings = pgTable("bookings", {
	bookingId: integer("booking_id").primaryKey().generatedAlwaysAsIdentity(),
	inmateId: integer("inmate_id").notNull().references(() => inmates.inmateId),
	facilityId: integer("facility_id").notNull().references(() => facilities.facilityId),
	bookingNumber: varchar("booking_number", { length: 30 }).notNull(),
	bookingDate: date("booking_date").notNull(),
	bookingTime: time("booking_time"),
	arrestingAgency: varchar("arresting_agency", { length: 100 }),
	arrestingOfficer: varchar("arresting_officer", { length: 100 }),
	arrestingOfficerRank: varchar("arresting_officer_rank", { length: 50 }),
	arrestLocation: varchar("arrest_location", { length: 150 }),
	timeOfArrest: timestamp("time_of_arrest", { withTimezone: true }),
	committingCourtId: integer("committing_court_id").notNull().references(() => committingCourts.committingCourtId),
	committOrderNumber: varchar("committ_order_number", { length: 50 }),
	committmentOrderDate: date("committment_order_date"),
	offenseCommited: varchar("offense_commited", { length: 255 }).notNull(),
	offenseCategory: varchar("offense_category", { length: 50 }),
	receivingOfficerId: integer("receiving_officer_id").notNull().references(() => personnel.personnelId),
	status: varchar({ length: 20 }).default("active").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
}, (table) => [
	unique("uq_bookings_booking_number").on(table.bookingNumber),]);

export const cases = pgTable("cases", {
	caseId: integer("case_id").primaryKey().generatedAlwaysAsIdentity(),
	caseNumber: varchar("case_number", { length: 50 }).notNull(),
	caseTitle: varchar("case_title", { length: 200 }),
	committingCourtId: integer("committing_court_id").notNull().references(() => committingCourts.committingCourtId),
	offenseCharged: varchar("offense_charged", { length: 255 }).notNull(),
	offenseCategory: varchar("offense_category", { length: 50 }),
	status: varchar({ length: 30 }).default("pending").notNull(),
	dateFiled: date("date_filed"),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
}, (table) => [
	unique("uq_cases_case_number").on(table.caseNumber),]);

export const cellAssignments = pgTable("cell_assignments", {
	cellAssignmentId: integer("cell_assignment_id").primaryKey().generatedAlwaysAsIdentity(),
	inmateId: integer("inmate_id").notNull().references(() => inmates.inmateId),
	cellId: integer("cell_id").notNull().references(() => cells.cellId),
	assignedAt: timestamp("assigned_at", { withTimezone: true }).default(sql`now()`).notNull(),
	assignedBy: integer("assigned_by").notNull().references(() => users.userId),
	reassignedAt: timestamp("reassigned_at", { withTimezone: true }),
	reassignedBy: integer("reassigned_by").references(() => users.userId),
});

export const cells = pgTable("cells", {
	cellId: integer("cell_id").primaryKey().generatedAlwaysAsIdentity(),
	facilityId: integer("facility_id").notNull().references(() => facilities.facilityId),
	cellName: varchar("cell_name", { length: 150 }).notNull(),
	type: varchar({ length: 30 }).notNull(),
	capacity: integer().notNull(),
	status: varchar({ length: 20 }).default("active").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
});

export const citiesMunicipalities = pgTable("cities_municipalities", {
	cityMunicipalityId: integer("city_municipality_id").primaryKey().generatedAlwaysAsIdentity(),
	regionId: integer("region_id").notNull().references(() => regions.regionId),
	provinceId: integer("province_id").notNull().references(() => provinces.provinceId),
	psgcCode: varchar("psgc_code", { length: 255 }).notNull(),
	cityMunicipalityCode: varchar("city_municipality_code", { length: 10 }).notNull(),
	cityMunicipalityDescription: text("city_municipality_description").notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	updatedBy: integer("updated_by").references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const committingCourts = pgTable("committing_courts", {
	committingCourtId: integer("committing_court_id").primaryKey().generatedAlwaysAsIdentity(),
	committingCourtName: varchar("committing_court_name", { length: 150 }).notNull(),
	branch: varchar({ length: 50 }),
	type: varchar({ length: 30 }).notNull(),
	address: varchar({ length: 255 }),
	status: varchar({ length: 20 }).default("active").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
});

export const countries = pgTable("countries", {
	countryId: integer("country_id").primaryKey().generatedAlwaysAsIdentity(),
	countryCode: varchar("country_code", { length: 10 }).notNull(),
	countryName: varchar("country_name", { length: 255 }).notNull(),
	officialName: varchar("official_name", { length: 255 }).notNull(),
	nativeName: varchar("native_name", { length: 255 }).notNull(),
	capitalCity: varchar("capital_city", { length: 255 }).notNull(),
	region: varchar({ length: 50 }).notNull(),
	subRegion: varchar("sub_region", { length: 50 }).notNull(),
	isoCode2: varchar("iso_code_2", { length: 2 }).notNull(),
	isoCode3: varchar("iso_code_3", { length: 3 }).notNull(),
	currencyCode: varchar("currency_code", { length: 3 }).notNull(),
	phoneCode: varchar("phone_code", { length: 10 }).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	updatedBy: integer("updated_by").references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const facilities = pgTable("facilities", {
	facilityId: integer("facility_id").primaryKey().generatedAlwaysAsIdentity(),
	facilityName: varchar("facility_name", { length: 150 }).notNull(),
	type: varchar({ length: 50 }).notNull(),
	capacity: integer().notNull(),
	addressLine: varchar("address_line", { length: 255 }),
	regionId: integer("region_id").notNull(),
	provinceId: integer("province_id").notNull(),
	cityMunicipalityId: integer("city_municipality_id").notNull(),
	barangayId: integer("barangay_id").notNull(),
	contactNumber: varchar("contact_number", { length: 30 }),
	status: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
});

export const inmateCases = pgTable("inmate_cases", {
	inmateCaseId: integer("inmate_case_id").primaryKey().generatedAlwaysAsIdentity(),
	inmateId: integer("inmate_id").notNull().references(() => inmates.inmateId),
	caseId: integer("case_id").notNull().references(() => cases.caseId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
}, (table) => [
	unique("uq_inmate_cases_inmate_case").on(table.inmateId, table.caseId),]);

export const inmates = pgTable("inmates", {
	inmateId: integer("inmate_id").primaryKey().generatedAlwaysAsIdentity(),
	inmateNumber: varchar("inmate_number", { length: 20 }).notNull(),
	firstName: varchar("first_name", { length: 60 }).notNull(),
	middleName: varchar("middle_name", { length: 60 }),
	lastName: varchar("last_name", { length: 60 }).notNull(),
	suffix: varchar({ length: 10 }),
	alias: varchar({ length: 100 }),
	sex: varchar({ length: 10 }).notNull(),
	civilStatus: varchar("civil_status", { length: 20 }),
	dateOfBirth: date("date_of_birth").notNull(),
	placeOfBirth: varchar("place_of_birth", { length: 150 }),
	nationality: varchar({ length: 50 }).default("filipino"),
	religion: varchar({ length: 50 }),
	educationalAttainment: varchar("educational_attainment", { length: 50 }),
	occupation: varchar({ length: 100 }),
	emergencyContactName: varchar("emergency_contact_name", { length: 150 }),
	emergencyContactNumber: varchar("emergency_contact_number", { length: 30 }),
	identifyingMarks: text("identifying_marks"),
	heightInCm: numeric("height_in_cm", { precision: 5, scale: 1 }),
	weightInKg: numeric("weight_in_kg", { precision: 5, scale: 1 }),
	bloodType: varchar("blood_type", { length: 5 }),
	status: varchar({ length: 20 }).default("detained").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
}, (table) => [
	unique("uq_inmates_inmate_number").on(table.inmateNumber),]);

export const personnel = pgTable("personnel", {
	personnelId: integer("personnel_id").primaryKey().generatedAlwaysAsIdentity(),
	employeeNumber: varchar("employee_number", { length: 30 }).notNull(),
	firstName: varchar("first_name", { length: 60 }).notNull(),
	middleName: varchar("middle_name", { length: 60 }),
	lastName: varchar("last_name", { length: 60 }).notNull(),
	suffix: varchar({ length: 10 }),
	rank: varchar({ length: 50 }),
	designation: varchar({ length: 100 }),
	badgeNumber: varchar("badge_number", { length: 20 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	contactNumber: varchar("contact_number", { length: 30 }),
	dateOfBirth: date("date_of_birth").notNull(),
	dateHired: date("date_hired").notNull(),
	status: varchar({ length: 20 }).default("active").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references((): AnyPgColumn => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references((): AnyPgColumn => users.userId),
}, (table) => [
	unique("uq_personnel_badge_number").on(table.badgeNumber),	unique("uq_personnel_email").on(table.email),	unique("uq_personnel_employee_number").on(table.employeeNumber),]);

export const personnelAssignments = pgTable("personnel_assignments", {
	personnelAssignmentId: integer("personnel_assignment_id").primaryKey().generatedAlwaysAsIdentity(),
	personnelId: integer("personnel_id").notNull().references(() => personnel.personnelId),
	facilityId: integer("facility_id").notNull().references(() => facilities.facilityId),
	assignedAt: timestamp("assigned_at", { withTimezone: true }).default(sql`now()`).notNull(),
	assignedBy: integer("assigned_by").notNull().references(() => users.userId),
	relievedAt: timestamp("relieved_at", { withTimezone: true }),
	relievedBy: integer("relieved_by").references(() => users.userId),
});

export const provinces = pgTable("provinces", {
	provinceId: integer("province_id").primaryKey().generatedAlwaysAsIdentity(),
	regionId: integer("region_id").notNull().references(() => regions.regionId),
	psgcCode: varchar("psgc_code", { length: 255 }).notNull(),
	provinceCode: varchar("province_code", { length: 10 }).notNull(),
	provinceDescription: text("province_description").notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	updatedBy: integer("updated_by").references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const regions = pgTable("regions", {
	regionId: integer("region_id").primaryKey().generatedAlwaysAsIdentity(),
	psgcCode: varchar("psgc_code", { length: 255 }).notNull(),
	regionCode: varchar("region_code", { length: 10 }).notNull(),
	regionDescription: text("region_description").notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	updatedBy: integer("updated_by").references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const users = pgTable("users", {
	userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
	personnelId: integer("personnel_id").notNull().references((): AnyPgColumn => personnel.personnelId),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	status: varchar({ length: 20 }).default("active").notNull(),
	lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by"),
}, (table) => [
	foreignKey({
		columns: [table.createdBy],
		foreignColumns: [table.userId],
		name: "fk_users_created_by"
	}),
	foreignKey({
		columns: [table.updatedBy],
		foreignColumns: [table.userId],
		name: "fk_users_updated_by"
	}),
	unique("uq_users_email").on(table.email),	unique("uq_users_personnel_id").on(table.personnelId),]);

export const validIds = pgTable("valid_ids", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	idCode: varchar("id_code", { length: 50 }).notNull(),
	idDescription: text("id_description").notNull(),
	issuedBy: text("issued_by").notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	updatedBy: integer("updated_by").references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const visitors = pgTable("visitors", {
	visitorId: integer("visitor_id").primaryKey().generatedAlwaysAsIdentity(),
	firstName: varchar("first_name", { length: 60 }).notNull(),
	middleName: varchar("middle_name", { length: 60 }),
	lastName: varchar("last_name", { length: 60 }).notNull(),
	suffix: varchar({ length: 10 }),
	relationship: varchar({ length: 30 }).notNull(),
	contactNumber: varchar("contact_number", { length: 30 }),
	validIdType: varchar("valid_id_type", { length: 30 }).notNull(),
	validIdNumber: varchar("valid_id_number", { length: 50 }),
	verifiedAt: timestamp("verified_at", { withTimezone: true }),
	verifiedBy: integer("verified_by").notNull().references(() => personnel.personnelId),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => personnel.personnelId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => personnel.personnelId),
});

export const visits = pgTable("visits", {
	visitId: integer("visit_id").primaryKey().generatedAlwaysAsIdentity(),
	inmateId: integer("inmate_id").notNull().references(() => inmates.inmateId),
	visitorId: integer("visitor_id").notNull().references(() => visitors.visitorId),
	visitDate: date("visit_date").notNull(),
	timeIn: time("time_in"),
	timeOut: time("time_out"),
	purpose: varchar({ length: 100 }),
	itemsBrought: text("items_brought"),
	officerOnDutyId: integer("officer_on_duty_id").notNull().references(() => users.userId),
	remarks: text(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`).notNull(),
	createdBy: integer("created_by").notNull().references(() => users.userId),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
	updatedBy: integer("updated_by").references(() => users.userId),
});
