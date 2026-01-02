ALTER TABLE `exercises` RENAME COLUMN "update_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN "height" TO "height_cm";--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN "weight" TO "weight_kg";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`current` integer DEFAULT false NOT NULL,
	`created_by` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`deleted_at` integer,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_routines`("id", "current", "created_by", "created_at", "updated_at", "deleted_at") SELECT "id", "current", "created_by", "created_at", "updated_at", "deleted_at" FROM `routines`;--> statement-breakpoint
DROP TABLE `routines`;--> statement-breakpoint
ALTER TABLE `__new_routines` RENAME TO `routines`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_by` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`deleted_at` integer,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_workouts`("id", "title", "description", "created_by", "created_at", "updated_at", "deleted_at") SELECT "id", "title", "description", "created_by", "created_at", "updated_at", "deleted_at" FROM `workouts`;--> statement-breakpoint
DROP TABLE `workouts`;--> statement-breakpoint
ALTER TABLE `__new_workouts` RENAME TO `workouts`;--> statement-breakpoint
CREATE TABLE `__new_exercise_equipment` (
	`exercise_id` integer NOT NULL,
	`equipment_id` integer NOT NULL,
	PRIMARY KEY(`equipment_id`, `exercise_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`equipment_id`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_exercise_equipment`("exercise_id", "equipment_id") SELECT "exercise_id", "equipment_id" FROM `exercise_equipment`;--> statement-breakpoint
DROP TABLE `exercise_equipment`;--> statement-breakpoint
ALTER TABLE `__new_exercise_equipment` RENAME TO `exercise_equipment`;--> statement-breakpoint
CREATE TABLE `__new_exercise_muscle` (
	`exercise_id` integer NOT NULL,
	`muscle_id` integer NOT NULL,
	`type` text NOT NULL,
	PRIMARY KEY(`exercise_id`, `muscle_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_exercise_muscle`("exercise_id", "muscle_id", "type") SELECT "exercise_id", "muscle_id", "type" FROM `exercise_muscle`;--> statement-breakpoint
DROP TABLE `exercise_muscle`;--> statement-breakpoint
ALTER TABLE `__new_exercise_muscle` RENAME TO `exercise_muscle`;--> statement-breakpoint
ALTER TABLE `muscles` ADD `muscle_group_id` integer REFERENCES muscle_group(id);