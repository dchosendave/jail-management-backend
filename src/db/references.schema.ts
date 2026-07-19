import { date, foreignKey, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const countries = pgTable("countries", {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    countryCode: varchar('country_code', { length: 10} ).notNull(),
    countryName: varchar('country_name', { length: 255}).notNull(),
    officialName: varchar('official_name', { length: 255}).notNull(),
    isoCode2: varchar('iso_code_2', { length: 2} )
});
