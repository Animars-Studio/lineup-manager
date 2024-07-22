DROP TABLE "user_positions";--> statement-breakpoint
ALTER TABLE "positions" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "teamId" SET DATA TYPE varchar;