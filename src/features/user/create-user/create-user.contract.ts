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

/* import { users } from '@/entities/user/user.schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const BaseInsertSchema = createInsertSchema( users, {
  email: ( schema ) => schema.email( { message: 'Invalid email address' } ),
  username: ( schema ) => schema.min( 3, { message: 'Username must be at least 3 characters' } ),
} )

export const CreateUserSchema = BaseInsertSchema.pick( {
  email: true,
  username: true,
  gender: true,
  date_of_birth: true,
  height: true,
  weight: true,
  unit: true,
} ).extend( {
  date_of_birth: z.date(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  gender: z.enum( [ 'male', 'female', 'other' ] ).optional(),
  unit: z.enum( [ 'metric', 'imperial' ] ).default( 'metric' ).optional(),
} )

export type CreateUserDTO = z.infer<typeof CreateUserSchema> */
