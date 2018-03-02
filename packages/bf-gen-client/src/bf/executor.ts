import {
  Opcode,
  OP_PLUS,
  OP_MINUS,
  OP_RIGHT,
  OP_LEFT,
  OP_OUT,
  OP_IN,
} from './ops';
import {
  Block,
  ProgramBlock,
  LoopBlock,
  OpsBlock,
  InputSource,
} from './interpreter';

/**
 * Executor
 */
export class Executor {
  protected program: ProgramBlock;
  protected inputSource: InputSource;
  /**
   * Maximum memory size (in bytes)
   */
  protected MAX_MEMORY_SIZE = 10_000_000;
  constructor(program: ProgramBlock, inputSource: InputSource) {
    this.program = program;
    this.inputSource = inputSource;
  }
  /**
   * Execute a program.
   */
  public async *execute(): AsyncIterableIterator<number> {
    // Prepare a memory, filled with 0.
    let memory = new Uint8Array(30000);
    // memory pointer.
    let ptr = 0;
    // Execution stack.
    const stack: StackNode[] = [
      {
        parent: this.program,
        index: 0,
      },
    ];
    let top = 0;

    while (top >= 0) {
      const st = stack[top];
      const current = st.parent.blocks[st.index];
      if (current == null) {
        // end of this node.
        top--;
        continue;
      }

      if (current.type === 'ops') {
        // Run operators in sequence.
        for (const op of current.ops) {
          switch (op) {
            case OP_PLUS: {
              memory[ptr]++;
              break;
            }
            case OP_MINUS: {
              memory[ptr]--;
              break;
            }
            case OP_RIGHT: {
              ptr++;
              if (ptr >= this.MAX_MEMORY_SIZE) {
                throw new Error(
                  `Maximum memory size (${
                    this.MAX_MEMORY_SIZE
                  } bytes) exceeded`,
                );
              } else if (ptr >= memory.length) {
                // extend memory.
                const newsize = Math.min(
                  this.MAX_MEMORY_SIZE,
                  memory.length * 2,
                );
                memory = extend(memory, newsize);
              }
              break;
            }
            case OP_LEFT: {
              ptr--;
              if (ptr < 0) {
                throw new Error('Memory pointer cannot be less than 0');
              }
              break;
            }
            case OP_OUT: {
              yield memory[ptr];
              break;
            }
            case OP_IN: {
              // TODO
              const inp = await this.getInput();
              memory[ptr] = inp;
              break;
            }
            default: {
              throw new Error(`Invaliant error: unknown opcode ${op}`);
            }
          }
        }
        st.index++;
      } else if (current.type === 'loop') {
        // this is the start of loop.
        if (memory[ptr] === 0) {
          // This block is skipped.
          st.index++;
        } else {
          // This block should be executed.
          stack[++top] = {
            parent: current,
            index: 0,
          };
        }
      } else {
        const n: never = current;
      }
    }
  }
  /**
   * Get an input.
   */
  protected getInput(): Promise<number> {
    return this.inputSource();
  }
}

/**
 * Node of execution stack.
 */
interface StackNode {
  parent: ProgramBlock | LoopBlock;
  index: number;
}

/**
 * extend an arraybuffer and return new one.
 */
function extend(buf: Uint8Array, newsize: number): Uint8Array {
  const newone = new Uint8Array(newsize);
  newone.set(buf);
  return newone;
}
