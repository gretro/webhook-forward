export type Enum<T extends string> = {
  [key in T]: string;
};

export function makeEnum<T extends string>(...values: T[]): Enum<T> {
  return values.reduce<Enum<T>>((acc, value) => {
    acc[value] = value;

    return acc;
  }, {} as any);
}
