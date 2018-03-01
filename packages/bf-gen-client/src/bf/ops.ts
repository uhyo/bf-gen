import { Operator } from '@uhyo/bf-gen-defs';

/**
 * List of operators.
 */
export const operators: Operator[] = ['+', '-', '>', '<', '.', ',', '[', ']'];

/**
 * Descriptions of operators.
 */
export const operatorDesc: Record<Operator, string> = {
  '+': 'ポインタが指すメモリの値をインクリメントします。',
  '-': 'ポインタが指すメモリの値をデクリメントします。',
  '>': 'ポインタをインクリメントします。',
  '<': 'ポインタをデクリメントします。',
  '.': 'ポインタが指すメモリの値を出力します。',
  ',': '入力を1バイト受け取ってポインタが指すメモリの位置に書き込みます。',
  '[':
    'ポインタが指すメモリの値が0なら対応する{{closer}}の位置にジャンプします。',
  ']': '対応する{{opener}}の位置にジャンプします、',
};

export const OP_PLUS = 0;
export const OP_MINUS = 1;
export const OP_RIGHT = 2;
export const OP_LEFT = 3;
export const OP_OUT = 4;
export const OP_IN = 5;

/**
 * Numeric Operation codes.
 */
export const opcodes = {
  '+': OP_PLUS,
  '-': OP_MINUS,
  '>': OP_RIGHT,
  '<': OP_LEFT,
  '.': OP_OUT,
  ',': OP_IN,
};

export type Opcode = (typeof opcodes)[keyof (typeof opcodes)];
