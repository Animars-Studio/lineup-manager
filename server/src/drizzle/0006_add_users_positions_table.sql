CREATE TABLE IF NOT EXISTS "user_positions" (
	"userId" varchar NOT NULL,
	"positionId" varchar NOT NULL,
	CONSTRAINT "user_positions_userId_positionId_pk" PRIMARY KEY("userId","positionId")
);
--> statement-breakpoint
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
