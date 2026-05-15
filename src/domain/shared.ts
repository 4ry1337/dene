export type Branded<T, K extends string> = T & { readonly _brand: K };

export const nominal =
  <T>() =>
  (value: NoInfer<T>): T =>
    value as T;

export const refined = <T>(validate: (value: NoInfer<T>) => boolean) => {
  return (value: NoInfer<T>): T => {
    if (!validate(value)) throw new Error(`Invalid value: ${value}`);
    return value as T;
  };
};
