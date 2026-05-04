# Dene

Fitness logging application

## Principles

- **Offline-first** — full functionality without connectivity. Sync is additive, never blocking.
- **Practical** — no social noise, leaderboards, or gamification. Built for real gym use.
- **Fluid UX** — fast transitions, native-feeling, intuitive without tutorials.

## Platform

Expo React Native, iOS + Android

## Architecture

**Storage**: SQLite (expo-sqlite)
- Append-only event log
- Derived state tables (read-optimized)

**Write path**: Command → validate invariants → append Event → mutate state tables
- Validation enforces domain invariants before any event is written
- Transient write failures retry silently; unrecoverable failures surface to user
- No data loss allowed — every set log is persisted immediately on completion

**Undo**: Persistent, multi-step. Stored in event log — undo history survives app restarts. Applies to edit flows (exercises, workouts, routines).

**Sync**: Automatic and silent — triggers on app open, connectivity restore, and periodically in background. Event log is the sync unit. Conflict resolution TBD. Backend TBD.

## Features

### Onboarding
- Body parameters: weight, height, age, gender
- Units: metric
- Skippable — app is fully usable without completing onboarding

### Exercises
- Default library shipped with app
- User can create custom exercises
- Each exercise has primary and secondary muscle groups

### Workouts
- Templates: ordered list of exercises with optional target sets
- Max 20 exercises per workout (tentative technical limit)
- Max 32 sets per exercise (tentative technical limit)
- User-created

### Routines
- Ordered collection of workouts
- Multiple routines can be saved; user follows one at a time

### Logging

**Session flow (set-by-set):**
1. Home shows today's workout — user taps Start
2. Each screen = one set to log
3. User logs set → taps Next → rest timer starts
4. Rest timer ends → signals user (notification/sound) → user taps Continue
5. Advances to next set (same or next exercise)
6. When all sets complete → session summary screen
7. Summary: session stats, optional body weight, optional notes, Finish button
8. Tap Finish → home

**Sessions:**
- Every session references a workout (can be empty)
- One active session at a time
- Session persists across app close and phone shutdown — resumes from last persisted state on reopen
- Active session timer continues ticking while app is closed

**Building a session:**
- Start from an existing workout or an empty one
- Exercises and sets can be added at any time during the session
- Exercises can be created or picked from library mid-session

**Exercise substitution:**
- Per-set screen shows button to view the exercise
- From there user can edit or replace the exercise

**Skipping an exercise:**
- User is asked: do it after next exercise, or skip for this session
- At session end, if session diverged from workout template, user is prompted to sync changes back (sets and/or exercises via toggles) — declining leaves the template unchanged

**Previous performance:**
- Each set screen shows last logged result for that set position of that exercise (weight, reps, etc.) from the most recent session it appeared in

**Rest hierarchy (each level overrides the previous):**
1. Global default (settings)
2. Workout-level rest
3. Exercise-level rest
4. Per-set rest

**Past sessions:**
- Editable after completion (time, weight, exercises, sets)
- Changes to exercise library do not cascade to past sessions

### Plate Calculator
- TBD

### Stats
- Volume, PRs, muscle frequency
- TBD

### Social
- Sharing workouts and routines
- TBD

## Data Constraints

- Max 20 exercises per workout (tentative)
- Max 32 sets per exercise (tentative)
- No hard limits on weight, duration, or distance values
- No limit on number of workouts or routines

## Decisions

- **Event sourcing over direct mutations** — event log provides replayable, ordered history enabling sync across devices and persistent undo without additional infrastructure
- **Metric units only** — imperial conversion introduces precision loss
- **Skippable onboarding** — user should not be forced into setup before using the app
- **Expo** — best current cross-platform solution for iOS + Android
- **Session always references a workout** — ensures relational integrity in SQLite; empty workout covers ad-hoc use case

## Deferred

- Auth / cloud sync
- Stats UI
- Social features
- Plate calculator details
- Navigation structure
- Supported OS versions
- Conflict resolution strategy
