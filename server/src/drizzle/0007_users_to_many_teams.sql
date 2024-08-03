CREATE TABLE IF NOT EXISTS "user_teams" (
	"userId" varchar NOT NULL,
	"teamId" varchar NOT NULL,
	CONSTRAINT "user_teams_userId_teamId_pk" PRIMARY KEY("userId","teamId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_teams" ADD CONSTRAINT "user_teams_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_teams" ADD CONSTRAINT "user_teams_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "teamId";