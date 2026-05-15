import { type Branded, nominal } from "./shared";

export type EventId = Branded<string, "event_id">;

export const EventId = nominal<EventId>();

export type Event<Type extends string, Data> = {
  id: EventId;
  type: Type;
  created_at: number;
  data: Data;
};
