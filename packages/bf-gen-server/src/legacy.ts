import { Operator, LanguageDefinition, Operators } from '@uhyo/bf-gen-defs';

export type DBDocOperators = {
  plus: string; // +
  minus: string; // -
  left: string; // <
  right: string; // >
  in: string; // ,
  out: string; // .
  start: string; // [
  end: string; // ]
};

export type DBLanguageDefinition = Omit<LanguageDefinition, 'ops'> & {
  ops: DBDocOperators;
};

const conversion: Array<[Operator, keyof DBDocOperators]> = [
  ['+', 'plus'],
  ['-', 'minus'],
  ['<', 'left'],
  ['>', 'right'],
  [',', 'in'],
  ['.', 'out'],
  ['[', 'start'],
  [']', 'end'],
];

export function legacyToDoc(legacy: LanguageDefinition): DBLanguageDefinition {
  const newOps = {} as DBDocOperators;
  for (const [o, n] of conversion) {
    newOps[n] = legacy.ops[o];
  }
  return {
    ...legacy,
    ops: newOps,
  };
}

export function docToLegacy(
  doc: LanguageDefinition | DBLanguageDefinition,
): LanguageDefinition {
  if ('.' in doc.ops) {
    // legacy
    return { ...doc, ops: doc.ops };
  }
  const oldOps = {} as Operators;
  for (const [o, n] of conversion) {
    oldOps[o] = doc.ops[n];
  }
  return {
    ...doc,
    ops: oldOps,
  };
}
