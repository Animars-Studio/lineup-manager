CREATE TABLE IF NOT EXISTS "positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"abbreviation" varchar DEFAULT '' NOT NULL,
	"longName" varchar DEFAULT '' NOT NULL,
	"fieldIdentifier" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT '' NOT NULL,
	"country" varchar DEFAULT '' NOT NULL,
	"logoUrl" varchar DEFAULT '' NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_positions" (
	"userId" integer NOT NULL,
	"positionId" integer NOT NULL,
	CONSTRAINT "user_positions_userId_positionId_pk" PRIMARY KEY("userId","positionId")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstName" varchar DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" varchar DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "dateOfBirth" varchar DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "teamId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_positions" ADD CONSTRAINT "user_positions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_positions" ADD CONSTRAINT "user_positions_positionId_positions_id_fk" FOREIGN KEY ("positionId") REFERENCES "public"."positions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
