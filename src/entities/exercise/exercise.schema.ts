import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'
import { users } from '../user/user.schema'
import { equipments } from '../equipment/equipment.schema'
import { muscles } from '../muscle/muscle.schema'

export const exercise_type = sqliteTable( 'exercise_types', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull(),
  description: text(),
} )

export const exercises = sqliteTable( 'exercises', {
  id: integer().primaryKey( { autoIncrement: true } ),
  title: text().notNull(),
  description: text(),
  exercise_type: integer().references( () => exercise_type.id, { onDelete: 'set null' } ),
  created_by: integer().references( () => users.id, { onDelete: 'set null' } ),
  created_at: integer( { mode: 'timestamp' } ).default( sql`(current_timestamp)` ),
  updated_at: integer( { mode: 'timestamp' } ).default( sql`(current_timestamp)` ),
  deleted_at: integer( { mode: 'timestamp' } )
} )

export const exercise_relations = relations( exercises, ( { many, one } ) => ( {
  creator: one( users, {
    fields: [ exercises.created_by ],
    references: [ users.id ],
  } ),
  type: one( exercise_type, {
    fields: [ exercises.exercise_type ],
    references: [ exercise_type.id ]
  } ),
  equipments: many( exercise_equipment ),
  muscles: many( exercise_muscle ),
} ) )

export const exercise_equipment = sqliteTable( 'exercise_equipment', {
  exercise_id: integer().notNull().references( () => exercises.id, { onDelete: 'cascade' } ),
  equipment_id: integer().notNull().references( () => equipments.id ),
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.equipment_id, t.exercise_id ] } )
] )

export const exercise_equipment_relations = relations( exercise_equipment, ( { one } ) => ( {
  exercises: one( exercises, {
    fields: [ exercise_equipment.exercise_id ],
    references: [ exercises.id ]
  } ),
  equipments: one( equipments, {
    fields: [ exercise_equipment.equipment_id ],
    references: [ equipments.id ]
  } ),
} ) )

export const exercise_muscle = sqliteTable( 'exercise_muscle', {
  exercise_id: integer().notNull().references( () => exercises.id, { onDelete: 'cascade' } ),
  muscle_id: integer().notNull().references( () => muscles.id ),
  type: text( { enum: [ "primary", "secondary" ] } ).notNull()
}, ( t ) => [
  primaryKey( { name: 'id', columns: [ t.exercise_id, t.muscle_id ] } )
] )

export const exercise_muscle_relations = relations( exercise_muscle, ( { one } ) => ( {
  exercises: one( exercises, {
    fields: [ exercise_muscle.exercise_id ],
    references: [ exercises.id ]
  } ),
  muscles: one( muscles, {
    fields: [ exercise_muscle.muscle_id ],
    references: [ muscles.id ]
  } ),
} ) )
