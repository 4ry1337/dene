export type Event<Type extends string, Data> = {
  type: Type;
  created_at: number;
  data: Data;
};

export const nominal =
  <T>() =>
  (value: string): T =>
    value as T;

export const refined = <T>(validate: (value: string) => boolean) => {
  return (value: string): T => {
    if (!validate(value)) throw new Error(`Invalid value: ${value}`);
    return value as T;
  };
};
