import { exercises } from '@/entities/exercise'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const CreateExerciseSchema = createInsertSchema( exercises, {
  title: z.string().min( 1, {
    message: 'The exercise title is required.',
  } ),
} )

export type CreateExerciseDTO = z.infer<typeof CreateExerciseSchema>
