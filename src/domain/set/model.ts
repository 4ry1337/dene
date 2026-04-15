export type SetData = { type: "strength"; reps: number; weight_kg: number } | { type: "duration"; duration_sec: number } | { type: "cardio"; duration_sec: number; distance_m?: number }

