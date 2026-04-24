export type Event<Type extends string, Data> = {
  type: Type;
  created_at: number;
  data: Data;
};
