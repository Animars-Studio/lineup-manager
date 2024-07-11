CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"username" varchar,
	"password" varchar,
	"created_at" timestamp,
	"updated_at" timestamp
);
