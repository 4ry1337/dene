import { users } from '@/entities/user'
import { createInsertSchema } from 'drizzle-zod'
import * as z from "zod"

export const CreateUserSchema = createInsertSchema( users, {
  email: z.email( 'Invalid email address' ),
  username: ( schema ) => schema.min( 3, 'Username must be at least 3 characters' ),
  unit: ( schema ) => schema.nullable(),
  height: ( schema ) => schema.gt( 0, 'Must be possitive' ),
  weight: ( schema ) => schema.gt( 0, 'Must be possitive' ),
} )

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
