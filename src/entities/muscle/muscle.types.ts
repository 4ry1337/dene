import { muscle_group, muscles } from './muscle.schema'

export type Muscle = typeof muscles.$inferSelect

export type MuscleGroup = typeof muscle_group.$inferSelect
