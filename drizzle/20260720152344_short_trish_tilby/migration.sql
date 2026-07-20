-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "bookings" (
	"booking_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_booking_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"inmate_id" integer NOT NULL,
	"facility_id" integer NOT NULL,
	"booking_number" varchar(30) NOT NULL CONSTRAINT "uq_bookings_booking_number" UNIQUE,
	"booking_date" date NOT NULL,
	"booking_time" time,
	"arresting_agency" varchar(100),
	"arresting_officer" varchar(100),
	"arresting_officer_rank" varchar(50),
	"arrest_location" varchar(150),
	"time_of_arrest" timestamp with time zone,
	"committing_court_id" integer NOT NULL,
	"committ_order_number" varchar(50),
	"committment_order_date" date,
	"offense_commited" varchar(255) NOT NULL,
	"offense_category" varchar(50),
	"receiving_officer_id" integer NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "cases" (
	"case_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cases_case_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"case_number" varchar(50) NOT NULL CONSTRAINT "uq_cases_case_number" UNIQUE,
	"case_title" varchar(200),
	"committing_court_id" integer NOT NULL,
	"offense_charged" varchar(255) NOT NULL,
	"offense_category" varchar(50),
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"date_filed" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "cell_assignments" (
	"cell_assignment_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cell_assignments_cell_assignment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"inmate_id" integer NOT NULL,
	"cell_id" integer NOT NULL,
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"assigned_by" integer NOT NULL,
	"reassigned_at" timestamp with time zone,
	"reassigned_by" integer
);
--> statement-breakpoint
CREATE TABLE "cells" (
	"cell_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cells_cell_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"facility_id" integer NOT NULL,
	"cell_name" varchar(150) NOT NULL,
	"type" varchar(30) NOT NULL,
	"capacity" integer NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "committing_courts" (
	"committing_court_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "committing_courts_committing_court_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"committing_court_name" varchar(150) NOT NULL,
	"branch" varchar(50),
	"type" varchar(30) NOT NULL,
	"address" varchar(255),
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "countries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country_code" varchar(10) NOT NULL,
	"country_name" varchar(255) NOT NULL,
	"official_name" varchar(255) NOT NULL,
	"iso_code_2" varchar(2)
);
--> statement-breakpoint
CREATE TABLE "facilities" (
	"facility_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "facilities_facility_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"facility_name" varchar(150) NOT NULL,
	"type" varchar(50) NOT NULL,
	"capacity" integer NOT NULL,
	"address_line" varchar(255),
	"region_id" integer NOT NULL,
	"province_id" integer NOT NULL,
	"city_municipality_id" integer NOT NULL,
	"barangay_id" integer NOT NULL,
	"contact_number" varchar(30),
	"status" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "inmate_cases" (
	"inmate_case_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inmate_cases_inmate_case_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"inmate_id" integer NOT NULL,
	"case_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer,
	CONSTRAINT "uq_inmate_cases_inmate_case" UNIQUE("inmate_id","case_id")
);
--> statement-breakpoint
CREATE TABLE "inmates" (
	"inmate_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inmates_inmate_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"inmate_number" varchar(20) NOT NULL CONSTRAINT "uq_inmates_inmate_number" UNIQUE,
	"first_name" varchar(60) NOT NULL,
	"middle_name" varchar(60),
	"last_name" varchar(60) NOT NULL,
	"suffix" varchar(10),
	"alias" varchar(100),
	"sex" varchar(10) NOT NULL,
	"civil_status" varchar(20),
	"date_of_birth" date NOT NULL,
	"place_of_birth" varchar(150),
	"nationality" varchar(50) DEFAULT 'filipino',
	"religion" varchar(50),
	"educational_attainment" varchar(50),
	"occupation" varchar(100),
	"emergency_contact_name" varchar(150),
	"emergency_contact_number" varchar(30),
	"identifying_marks" text,
	"height_in_cm" numeric(5,1),
	"weight_in_kg" numeric(5,1),
	"blood_type" varchar(5),
	"status" varchar(20) DEFAULT 'detained' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "personnel" (
	"personnel_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "personnel_personnel_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"employee_number" varchar(30) NOT NULL CONSTRAINT "uq_personnel_employee_number" UNIQUE,
	"first_name" varchar(60) NOT NULL,
	"middle_name" varchar(60),
	"last_name" varchar(60) NOT NULL,
	"suffix" varchar(10),
	"rank" varchar(50),
	"designation" varchar(100),
	"badge_number" varchar(20) NOT NULL CONSTRAINT "uq_personnel_badge_number" UNIQUE,
	"email" varchar(255) NOT NULL CONSTRAINT "uq_personnel_email" UNIQUE,
	"contact_number" varchar(30),
	"date_of_birth" date NOT NULL,
	"date_hired" date NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "personnel_assignments" (
	"personnel_assignment_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "personnel_assignments_personnel_assignment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"personnel_id" integer NOT NULL,
	"facility_id" integer NOT NULL,
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	"assigned_by" integer NOT NULL,
	"relieved_at" timestamp with time zone,
	"relieved_by" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"personnel_id" integer NOT NULL CONSTRAINT "uq_users_personnel_id" UNIQUE,
	"email" varchar(255) NOT NULL CONSTRAINT "uq_users_email" UNIQUE,
	"password_hash" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "visitors" (
	"visitor_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "visitors_visitor_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(60) NOT NULL,
	"middle_name" varchar(60),
	"last_name" varchar(60) NOT NULL,
	"suffix" varchar(10),
	"relationship" varchar(30) NOT NULL,
	"contact_number" varchar(30),
	"valid_id_type" varchar(30) NOT NULL,
	"valid_id_number" varchar(50),
	"verified_at" timestamp with time zone,
	"verified_by" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "visits" (
	"visit_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "visits_visit_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"inmate_id" integer NOT NULL,
	"visitor_id" integer NOT NULL,
	"visit_date" date NOT NULL,
	"time_in" time,
	"time_out" time,
	"purpose" varchar(100),
	"items_brought" text,
	"officer_on_duty_id" integer NOT NULL,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone,
	"updated_by" integer
);
--> statement-breakpoint
ALTER TABLE "personnel" ADD CONSTRAINT "fk_personnel_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "personnel" ADD CONSTRAINT "fk_personnel_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "fk_users_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "fk_users_personnel_id" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("personnel_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "fk_users_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "facilities" ADD CONSTRAINT "fk_facilities_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "facilities" ADD CONSTRAINT "fk_facilities_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "committing_courts" ADD CONSTRAINT "fk_committing_courts_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "committing_courts" ADD CONSTRAINT "fk_committing_courts_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "inmates" ADD CONSTRAINT "fk_inmates_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "inmates" ADD CONSTRAINT "fk_inmates_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "visitors" ADD CONSTRAINT "fk_visitors_created_by" FOREIGN KEY ("created_by") REFERENCES "personnel"("personnel_id");--> statement-breakpoint
ALTER TABLE "visitors" ADD CONSTRAINT "fk_visitors_updated_by" FOREIGN KEY ("updated_by") REFERENCES "personnel"("personnel_id");--> statement-breakpoint
ALTER TABLE "visitors" ADD CONSTRAINT "fk_visitors_verified_by" FOREIGN KEY ("verified_by") REFERENCES "personnel"("personnel_id");--> statement-breakpoint
ALTER TABLE "personnel_assignments" ADD CONSTRAINT "fk_personnel_assignments_assigned" FOREIGN KEY ("assigned_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "personnel_assignments" ADD CONSTRAINT "fk_personnel_assignments_facility" FOREIGN KEY ("facility_id") REFERENCES "facilities"("facility_id");--> statement-breakpoint
ALTER TABLE "personnel_assignments" ADD CONSTRAINT "fk_personnel_assignments_personnel" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("personnel_id");--> statement-breakpoint
ALTER TABLE "personnel_assignments" ADD CONSTRAINT "fk_personnel_assignments_relieved" FOREIGN KEY ("relieved_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "cells" ADD CONSTRAINT "fk_cells_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "cells" ADD CONSTRAINT "fk_cells_facility" FOREIGN KEY ("facility_id") REFERENCES "facilities"("facility_id");--> statement-breakpoint
ALTER TABLE "cells" ADD CONSTRAINT "fk_cells_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "cell_assignments" ADD CONSTRAINT "fk_cell_assignments_assigned" FOREIGN KEY ("assigned_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "cell_assignments" ADD CONSTRAINT "fk_cell_assignments_cell" FOREIGN KEY ("cell_id") REFERENCES "cells"("cell_id");--> statement-breakpoint
ALTER TABLE "cell_assignments" ADD CONSTRAINT "fk_cell_assignments_inmate" FOREIGN KEY ("inmate_id") REFERENCES "inmates"("inmate_id");--> statement-breakpoint
ALTER TABLE "cell_assignments" ADD CONSTRAINT "fk_cell_assignments_reassigned" FOREIGN KEY ("reassigned_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "cases" ADD CONSTRAINT "fk_cases_committing_court" FOREIGN KEY ("committing_court_id") REFERENCES "committing_courts"("committing_court_id");--> statement-breakpoint
ALTER TABLE "cases" ADD CONSTRAINT "fk_cases_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "cases" ADD CONSTRAINT "fk_cases_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "inmate_cases" ADD CONSTRAINT "fk_inmate_cases_case" FOREIGN KEY ("case_id") REFERENCES "cases"("case_id");--> statement-breakpoint
ALTER TABLE "inmate_cases" ADD CONSTRAINT "fk_inmate_cases_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "inmate_cases" ADD CONSTRAINT "fk_inmate_cases_inmate" FOREIGN KEY ("inmate_id") REFERENCES "inmates"("inmate_id");--> statement-breakpoint
ALTER TABLE "inmate_cases" ADD CONSTRAINT "fk_inmate_cases_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_committing_court" FOREIGN KEY ("committing_court_id") REFERENCES "committing_courts"("committing_court_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_facility" FOREIGN KEY ("facility_id") REFERENCES "facilities"("facility_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_inmate" FOREIGN KEY ("inmate_id") REFERENCES "inmates"("inmate_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_receiving_officer" FOREIGN KEY ("receiving_officer_id") REFERENCES "personnel"("personnel_id");--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "fk_bookings_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_inmate" FOREIGN KEY ("inmate_id") REFERENCES "inmates"("inmate_id");--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_officer_on_duty" FOREIGN KEY ("officer_on_duty_id") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("user_id");--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_visitor" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("visitor_id");
*/