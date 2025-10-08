import { z } from 'zod'

export const CreateExerciseSchema = z.object( {
  title: z.string().min( 1, {
    message: 'The exercise title is required.',
  } ),
  description: z.string(),
} )
