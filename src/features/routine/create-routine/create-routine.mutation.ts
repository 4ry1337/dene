import { drizzle_db } from '@/shared/lib'
import { routines } from '@/entities/routine'
import { CreateRoutineDTO, CreateRoutineSchema } from './create-routine.contract'

export type CreateRoutineResult = {
  id: number,
}

export async function createRoutine( input: CreateRoutineDTO ): Promise<CreateRoutineResult> {
  const parsed = CreateRoutineSchema.parse( input )

  const [ inserted ] = await drizzle_db.insert( routines )
    .values( parsed )
    .returning( {
      id: routines.id,
    } )

  return {
    id: inserted.id,
  }
}
