import { Operator, Operators } from '@uhyo/bf-gen-defs';
import { bind } from 'bind-decorator';
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
  protected inputSource: () => Promise<string>;
  /**
   * Buffered input.
   */
  protected inputBuffer: { buf: number[]; index: number } | null = null;
  constructor(ops: Operators, inputSource: () => Promise<string>) {
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
    const executor = new Executor(program, this.getInput);
    return executor.execute();
  }
  /**
   * Generate incoming user input.
   */
  @bind
  protected async getInput(): Promise<number> {
    const i = this.inputBuffer;
    if (i == null || i.buf.length <= i.index) {
      // input buffer is exhaused.
      while (true) {
        const input = await this.inputSource();
        if (input.length !== 0) {
          this.inputBuffer = {
            // TODO encode into UTF-8?
            buf: Array.from(input, ch => ch.codePointAt(0)!),
            index: 0,
          };
          break;
        }
      }
    }
    const { inputBuffer } = this;
    if (inputBuffer != null) {
      const { buf, index } = inputBuffer;
      if (index < buf.length) {
        // Can provide a next input.
        const ch = buf[index];
        inputBuffer.index++;
        return ch;
      }
    }
    throw new Error('Invariant failed');
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
