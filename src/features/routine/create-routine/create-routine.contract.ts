import { routines } from '@/entities/routine'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const CreateRoutineSchema = createInsertSchema( routines, {
  title: z.string().min( 1, {
    message: 'Title is required.',
  } ),
} )

export type CreateRoutineDTO = z.infer<typeof CreateRoutineSchema>
