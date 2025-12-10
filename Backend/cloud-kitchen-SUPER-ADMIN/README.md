# Cloud Kitchen Admin (Single Backend)

### Run
1) Start MySQL and create `ck_admin_db`
2) Optionally set env vars: MYSQL_URL, MYSQL_USER, MYSQL_PASS, JWT_SECRET
3) `mvn spring-boot:run`

### Login
POST http://localhost:8080/api/admin/login
{"username":"superadmin","password":"SuperAdmin@123"}

Use `Authorization: Bearer <token>` for protected endpoints.
