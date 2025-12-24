CREATE TABLE `equipments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`image` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `equipments_name_unique` ON `equipments` (`name`);--> statement-breakpoint
CREATE TABLE `exercise_equipment` (
	`exercise_id` integer NOT NULL,
	`equipment_id` integer NOT NULL,
	PRIMARY KEY(`equipment_id`, `exercise_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`equipment_id`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercise_muscle` (
	`exercise_id` integer NOT NULL,
	`muscle_id` integer NOT NULL,
	`type` text,
	PRIMARY KEY(`exercise_id`, `muscle_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercise_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`exercise_type` integer,
	`created_by` integer,
	`created_at` integer DEFAULT (current_timestamp),
	`update_at` integer DEFAULT (current_timestamp),
	`deleted_at` integer,
	FOREIGN KEY (`exercise_type`) REFERENCES `exercise_types`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `muscle_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `muscle_group_title_unique` ON `muscle_group` (`title`);--> statement-breakpoint
CREATE TABLE `muscles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `muscles_title_unique` ON `muscles` (`title`);--> statement-breakpoint
CREATE TABLE `routine_workout` (
	`routine_id` integer NOT NULL,
	`workout_id` integer NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	PRIMARY KEY(`routine_id`, `workout_id`),
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workout_id`) REFERENCES `workouts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`current` integer DEFAULT false NOT NULL,
	`created_by` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`update_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`deleted_at` integer,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`push_notifications` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`gender` text,
	`date_of_birth` integer,
	`height` real,
	`weight` real,
	`unit` text DEFAULT 'metric',
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `workout_exercise` (
	`workout_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`order` real DEFAULT 0 NOT NULL,
	PRIMARY KEY(`workout_id`, `exercise_id`),
	FOREIGN KEY (`workout_id`) REFERENCES `workouts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_by` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`update_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`deleted_at` integer,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
