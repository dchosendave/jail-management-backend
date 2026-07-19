# Jail Management API

## Backend API Endpoints

### Inmates
- `POST   /inmates`                          — Register a new inmate (PDL)
- `GET    /inmates`                          — List/search inmates
- `GET    /inmates/:id`                      — Get inmate details
- `PATCH  /inmates/:id`                      — Update inmate information
- `GET    /inmates/:id/bookings`             — List bookings for an inmate
- `GET    /inmates/:id/cases`                — List cases for an inmate
- `GET    /inmates/:id/visits`               — List visit history for an inmate
- `POST   /inmates/:id/attachments`          — Attach a file to an inmate record

### Personnel
- `POST   /personnel`                        — Register a new jail officer
- `GET    /personnel`                        — List personnel
- `GET    /personnel/:id`                    — Get personnel details
- `PATCH  /personnel/:id`                    — Update personnel information

### Facilities & Cells
- `POST   /facilities`                       — Register a jail facility
- `GET    /facilities`                       — List facilities
- `GET    /facilities/:id`                   — Get facility details
- `PATCH  /facilities/:id`                   — Update facility
- `GET    /facilities/:id/cells`             — List cells in a facility
- `POST   /facilities/:id/cells`             — Add a cell/dormitory

### Bookings
- `POST   /bookings`                         — Create a booking/admission record
- `GET    /bookings/:id`                     — Get booking details

### Cases
- `POST   /cases`                            — Register a criminal case
- `GET    /cases`                            — List/search cases
- `GET    /cases/:id`                        — Get case details
- `POST   /inmates/:id/cases`                — Link a case to an inmate

### Visitors & Visits
- `POST   /visitors`                         — Register a visitor
- `POST   /visits`                           — Log a visit
- `GET    /inmates/:id/visits`               — List visits for an inmate

### Attachments (polymorphic)
- `POST   /attachments`                      — Upload a file linked to any entity

### Auth
- `POST   /auth/otp/send`                    — Send OTP for account action
- `POST   /auth/otp/verify`                  — Verify OTP code
- `POST   /auth/otp/resend`                  — Resend OTP
- `POST   /auth/change-password`             — Change password
- `POST   /auth/forgot-password`             — Forgot password

### References
- `GET    /references/countries`
- `GET    /references/regions`
- `GET    /references/provinces`
- `GET    /references/cities-and-municipalities`
- `GET    /references/barangays`
- `GET    /references/valid-ids`
- `GET    /references/questions`
