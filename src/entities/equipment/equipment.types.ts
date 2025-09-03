import { equipments } from './equipment.schema'

export type Equipment = typeof equipments.$inferSelect
