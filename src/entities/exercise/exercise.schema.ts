import { z } from 'zod'

export const ExerciseSchema = z.object( {
  id: z.uuid(),
  // category: 
  title: z.string(),
  description: z.string()
  // equipment
} )
