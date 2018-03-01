import { Operator, Operators } from '@uhyo/bf-gen-defs';
import { operators } from './ops';

/**
 * Tokenizer
 */
export class Tokenizer {
  protected ops: Operators;
  constructor(ops: Operators) {
    this.ops = ops;
  }
  /**
   * Parse given source code into operators.
   */
  public *parse(code: string): IterableIterator<Operator> {
    // Assumption: the language has no conflict.
    const { ops } = this;
    const cache = initCache();
    const length = code.length;
    let index = 0;
    while (index < length) {
      // Check each operators.
      // XXX what if source code is longer than 0x7fffffff chars?
      let min = 0x7fffffff;
      let next: Operator | null = null;
      for (const op of operators) {
        const c = cache[op];
        if (c < index) {
          // this cache is deprecated.
          const i = code.indexOf(ops[op], index);
          if (i === -1) {
            // This token is not found.
            cache[op] = Infinity;
            continue;
          }
          cache[op] = i;
          if (min > i) {
            min = i;
            next = op;
          }
        } else if (c < min) {
          min = c;
          next = op;
        }
      }
      if (next == null) {
        // no operator is found forward.
        return;
      }
      // next operator is found.
      yield next;
      // update index.
      index = min + ops[next].length;
    }
  }
}

function initCache(): Record<Operator, number> {
  const result = {} as Record<Operator, number>;
  for (const op of operators) {
    result[op] = -Infinity;
  }
  return result;
}
