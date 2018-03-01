import { Operator, Operators } from '@uhyo/bf-gen-defs';
import { Opcode, opcodes } from './ops';
import { Tokenizer } from './tokenizer';
import { Executor } from './executor';

export interface RunResult {
  error: boolean;
  output: string;
}

/**
 * Source of input.
 */
export interface InputSource {
  (): Promise<number>;
}

/**
 * BF interpreter class.
 */
export class BFInterpreter {
  /**
   * Tokenizer of current language.
   */
  protected tokenizer: Tokenizer;
  /**
   * Source of input.
   */
  protected inputSource: InputSource;
  constructor(ops: Operators, inputSource: InputSource) {
    this.tokenizer = new Tokenizer(ops);
    this.inputSource = inputSource;
  }

  public async *run(code: string): AsyncIterableIterator<number> {
    // Parse code into program.
    const program = this.parse(code);
    // Execute it.
    yield* this.execute(program);
  }

  /**
   * Parse source code into a BF program.
   */
  protected parse(code: string): ProgramBlock {
    let current: Block = {
      type: 'program',
      blocks: [],
    };

    for (const op of this.tokenizer.parse(code)) {
      if (op === '[') {
        // Enter a new loop.
        if (current.type === 'ops') {
          // close ops block.
          current = current.parent;
        }
        const b: LoopBlock = {
          type: 'loop',
          blocks: [],
          parent: current,
          running: false,
        };
        current.blocks.push(b);
        current = b;
        continue;
      }
      if (op === ']') {
        // Close the loop.
        if (current.type === 'ops') {
          // close ops block.
          // XXX TypeScript complains if we write `current = current.parent`
          const opb: OpsBlock = current;
          current = opb.parent;
        }
        if (current.type !== 'loop') {
          throw new Error('Syntax Error: no matching loop opener');
        }
        current = current.parent;
        continue;
      }
      // normal operators.
      if (current.type !== 'ops') {
        const c = current;
        const b: OpsBlock = {
          type: 'ops',
          ops: [],
          parent: current,
        };
        c.blocks.push(b);
        current = b;
      }
      current.ops.push(opcodes[op]);
    }
    if (current.type === 'ops') {
      current = current.parent;
    }
    if (current.type === 'loop') {
      throw new Error('Syntax Error: loop is not closed');
    }

    return current;
  }
  /**
   * Execute given BF program.
   */
  protected execute(program: ProgramBlock): AsyncIterableIterator<number> {
    const executor = new Executor(program, this.inputSource);
    return executor.execute();
  }
}

export type Block = OpsBlock | ProgramBlock | LoopBlock;
export interface OpsBlock {
  type: 'ops';
  ops: Opcode[];
  parent: ProgramBlock | LoopBlock;
}
export interface ProgramBlock {
  type: 'program';
  blocks: Array<LoopBlock | OpsBlock>;
}
export interface LoopBlock {
  type: 'loop';
  blocks: Array<LoopBlock | OpsBlock>;
  parent: Block;
  /**
   * Flag for execution.
   */
  running: boolean;
}
