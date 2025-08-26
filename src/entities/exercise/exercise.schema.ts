import { z } from 'zod'

export const ExerciseSchema = z.object( {
  id: z.uuid(),
  // category: 
  image_url: z.url(),
  video_irl: z.url(),
  title: z.string(),
  description: z.string()
  // equipment
} )
