CREATE TABLE countries (
    id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    country_code    VARCHAR(10) NOT NULL,
    country_name    VARCHAR(255) NOT NULL,
    official_name   VARCHAR(255) NOT NULL,
    iso_code_2      VARCHAR(2)
);
