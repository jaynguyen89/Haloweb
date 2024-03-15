export const toPascalCase = (some: string) => some.length === 0 ? some : some[0].toUpperCase() + some.slice(1);
