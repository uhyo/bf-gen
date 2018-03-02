/**
 * Sample of brainfuck programs.
 */
export const bfSamples: Array<SampleProgram> = [
  {
    name: 'Hello, world!',
    code: `+++++++++[
>++++++++>+++++++++++
>++++++++++++>+++++<<<<-
]>H.>++e.>l.l.+++o.
>-.------------.<
++++++++w.--------o.
+++r.------l.<-d.>>+!.
`,
  },
  {
    name: 'FizzBuzz',
    code: `+>+[->>[-]>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[-<+<+>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<]<<[-]>>[-]>>[-]<<<[->>>+<<+<]>>>
[-<<<+>>>]<<[-<<+>>]<<[[-]<+>>>[-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>][-]+[->[-]>[-]>[-]+++++++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]
<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<->>>]<+>>]<<][-]>[-]<<<[->>>+<+<<]>>>[-<<<+>>>][-]+<[[-]>-<][-]>>[-]<[->+<<+>]>[-<+>][-]+<<[[-]>>-<<]>[[-]>>>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++.+++++++++++++++++..--------------------------------------------------------.+++++++++++++++++++++++++++++++++++++++++++++++++++.+++++..------------------------------------------------------------------------------------------.<<<]>[[-]>>[-]>[-]
<<<<<<<<<<<[->>>>>>>>>>>+<+<<<<<<<<<<]>>>>>>>>>>>[-<<<<<<<<<<<+>>>>>>>>>>>][-]+[->[-]>[-]>[-]+++[-<+<+>>]<[->+<][-]>>[-]<<<<<[->>>>>+<<+<<<]>>>>>[-<<<<<+>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<->>]<+>>]<<][-]>[-]<<[->>+<+<]>>[-<<+>>][-]+<[[-]>-<][-]>>[-]<[->+<<+>]>[-<+>][-]+<<[[-]>>-<<]>[[-]>>>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++.+++++++++++++++++..------------------------------------------------------------------------------------------.
<<<]>[[-]>>[-]>[-]<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>+<+<<<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>][-]+[->[-]>[-]>[-]+++++[-<+<+>>]<[->+<][-]>>[-]<<<<<[->>>>>+<<+<<<]>>>>>[-<<<<<+>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<]
[-]+<[[-]>-<]>[[-]<[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<->>]<+>>]<<][-]>[-]<<[->>+<+<]>>[-<<+>>][-]+<[[-]>-<][-]>>[-]<[->+<<+>]>[-<+>][-]+<<[[-]>>-<<]>[[-]>>>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++++++++++++++++++++++++.+++++..------------------------------------------------------------------------------------------.
<<<]>[[-]>>[-]>[-]>[-]<<<<<<<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>>>>>>>+<+<<<<<<<<<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>>>>>>]<[-<+>][-]>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[-<+<+>>]<[->+<][-]>>[-]<<<<[->>>>+<<+<<]>>>>[-<<<<+>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<][-]>>>[-]<<[->>+<<<+>]>>[-<<+>>][-]+<<<[[-]>>>-<<<]>[[-]>>>[-]>[-]<<<<<<[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>]>[-]<[-]+[->>[-]>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<
]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<<+>[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<->>>]<<+>>>]<<<]<[-]>>>[-]>>>[-]<<<<[->>>>+<<<+<]>>>>[-<<<<+>>>>]<<<[-<<<+>>>]<<[-]>[-]<<[->>+<+<]>>[-<<+>>]<++++++++++++++++++++++++++++++++++++++++++++++++.>[-]>[-]<<<<<<<<[->>>>>>>>+<+<<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>][-]+[->[-]>>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[-<+<<+>>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]
<<<<<[->>>>>+<+<<<<]>>>>>[-<<<<<+>>>>>]<[[-]<<<<->>>>]<<][-]+<<[[-]>>-<<]>>[[-]<<[-]>>>>[-]<[->+<<<<+>>>]>[-<+>]<<<<[-<<->>]<+>>>]<<<][-]>[-]<<[->>+<+<]>>[-<<+>>]>>[-]<<[-]+[->>>>[-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<<<[->>>>>>>>+<<+<<<<<<]>>>>>>>>[-<<<<<<<<
+>>>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<<<+>>[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<<<->>>>>]<<<<+>>>>>]<<<<<]<[-]>>>>>[-]>>>[-]
<<<<<[->>>>>+<<<+<<]>>>>>[-<<<<<+>>>>>]<<<[-<<<<<+>>>>>]<<<<[-]>>[-]<<<[->>>+<<+<]>>>[-<<<+>>>]<<++++++++++++++++++++++++++++++++++++++++++++++++.<<<<<<<]>>[[-]>>>>>>>[-]>>[-]>[-]++++++++++[-<+<<+>>>]<[->+<][-]>>>[-]<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>+<<<+<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>]<<<[->>>[-]>[-]<<<<<<[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>]<[[-]<<<<<->>>>>]<<<][-]+<<[[-]>>-<<
]>>[[-]<<[-]>>>>>[-]<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>+<<<<<+<<<<<<<<<<<]>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>]>[-]<[-]+[->>[-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<<<<<[->>>>>>>>>>+<<+<<<<<<<<]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<<+>[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<<<<<->>>>>>>]<<+>>>]<<<]<<<<<[-]>>>>>>>[-]>>>[-]<<<<[->>>>+<<<+<]>>>>[-<<<<+>>>>]<<<[-<<<<<<<+>>>>>>>]<<[-]>[-]<<<<<<
[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>]<++++++++++++++++++++++++++++++++++++++++++++++++.<<<]<<<<<<<<<]<<[-]>>[-]<<<<[->>>>+<<+<<]>>>>[-<<<<+>>>>][-]+[->>>>>>>>>[-]>>>>[-]>[-]++++++++++[-<+<<<<+>>>>>]<[->+<][-]>>[-]<<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>>+<<+<<<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>]<<[->>[-]>>[-]
<<<<<<<<[->>>>>>>>+<<+<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>]<<[[-]<<<<<<->>>>>>]<<][-]+<<<<[[-]>>>>-<<<<]>>>>[[-]<<<<[-]>>>>>>[-]<[->+<<<<<<+>>>>>]>[-<+>]<<<<<<[-<<<<<<<<<<<->>>>>>>>>>>]<<<<<<<<<+>>>>>>>>>>>>>]<<<<<<<<<<<<<][-]>>>>>>>>>[-]<<<<<<<<<<<[->>>>>>>>>>>+<<<<<<<<<+<<]>>>>>>>>>>>[-<<<<<<<<<<<+>>>>>>>>>>>]<<<<<<<<<++++++++++++++++++++++++++++++++++++++++++++++++.<<<<[-]++++++++++++++++++++++++++++++++.<<]<<<<<]<<<<<]<[-]>[-]<<<<<<<<[->>>>>>>>+<+<<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>]<<<<<<<<+>>]<]>>>>>>>[-]++++++++++.`,
  },
  {
    name: '9x9',
    code:
      '[-]++++++++++[->+++<]>++>>[-]++++++++++[->+<]>>>+>+[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>][-]>[-]>[-]+++++++++[-<+<+>>]<[->+<]<[->[-]>>[-]<<<<[->>>>+<<+<<]>>>>[-<<<<+>>>>]<<[[-]<<->>]<][-]+<[[-]>-<]<[-]>[-]>>[-]<[->+<<+>]>[-<+>]<<[-<+>]<[[-]<+>>[-]+>>[-]+[->>>[-]>[-]<<<<<<[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>][-]>[-]>[-]+++++++++[-<+<+>>]<[->+<]<[->[-]>>[-]<<<<[->>>>+<<+<<]>>>>[-<<<<+>>>>]<<[[-]<<->>]<][-]+<[[-]>-<]<[-]>[-]>>[-]<[->+<<+>]>[-<+>]<<[-<+>]<[[-]<<+>>>[-]>>[-]<<<<<<<<<<[->>>>>>>>>>+<<+<<<<<<<<]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>][-]>>[-]<<<<<<<<<[->>>>>>>>>+<<+<<<<<<<]>>>>>>>>>[-<<<<<<<<<+>>>>>>>>>][-]<<<<[->>>>+<<<<][-]>>[->>>[-]>[-]<<[->>+<+<]>>[-<<+>>]<[-<<<<<+>>>>>]<<<][-]>>[-]>[-]<<<<<[->>>>>+<+<<<<]>>>>>[-<<<<<+>>>>>]<[-<<+>>][-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<[->>>>>+<<+<<<]>>>>>[-<<<<<+>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<][-]>>>[-]<<[->>+<<<+>]>>[-<<+>>][-]+<<<[[-]>>>-<<<]>[[-]>>>[-]>[-]<<<<<<<[->>>>>>>+<+<<<<<<]>>>>>>>[-<<<<<<<+>>>>>>>]>[-]<[-]+[->>[-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<<+>[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<->>>]<<+>>>]<<<]<[-]>>>[-]>>>[-]<<<<[->>>>+<<<+<]>>>>[-<<<<+>>>>]<<<[-<<<+>>>]<<[-]>[-]<<[->>+<+<]>>[-<<+>>]<++++++++++++++++++++++++++++++++++++++++++++++++.<<<<]>>[[-]<<<<<<<<<<<<<<<<<<<<.>>>>>>>>>>>>>>>>>>>>]<<[-]>>[-]<<<<<[->>>>>+<<+<<<]>>>>>[-<<<<<+>>>>>][-]+[->>>[-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>>[-]<<<<<<<<<[->>>>>>>>>+<<<+<<<<<<]>>>>>>>>>[-<<<<<<<<<+>>>>>>>>>]<<<[->>>[-]>[-]<<<<<[->>>>>+<+<<<<]>>>>>[-<<<<<+>>>>>]<[[-]<<<<->>>>]<<<][-]+<[[-]>-<]>[[-]<[-]>>>>[-]<<[->>+<<<<+>>]>>[-<<+>>]<<<<[-<<<<<->>>>>]<<<+>>>>]<<<<][-]>>>[-]<<<<<[->>>>>+<<<+<<]>>>>>[-<<<<<+>>>>>]<<<++++++++++++++++++++++++++++++++++++++++++++++++.<<<<<<<<<<<<<<<<<<<<.>>>>>>>>>>>>>[-]>>[-]<<<<<<<[->>>>>>>+<<+<<<<<]>>>>>>>[-<<<<<<<+>>>>>>>]<<<<<<<+>>>>]<<]<<<<<<<.>>>>>>>>>>>>[-]>>[-]<<<<<<<<<<<<[->>>>>>>>>>>>+<<+<<<<<<<<<<]>>>>>>>>>>>>[-<<<<<<<<<<<<+>>>>>>>>>>>>]<<<<<<<<<<<<+>>]<]',
  },
  {
    name: 'primes',
    code: `++>+[->>[-]>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[-<+<+>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<]<<[-]>>[-]>>[-]<<<
[->>>+<<+<]>>>[-<<<+>>>]<<[-<<+>>]<<[[-]<+>>>[-]>>[-]++>[-]+[->>[-]>[-]<<<<<<<<<<[->>>>>>>>>>+<+<<<<<<<<<]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>][-]>[-]<<<<<[->>>>>+<+<<<<]>>>>>[-<<<<<+>>>>>]<[->[-]>[-]<<<[->>>+<+<<]>>>[-<<<+>>>]<[[-]<<->>]<]<<[-]>>[-]>[-]<<[->>+<+<]>>[-<<+>>]<[-<<+>>]<<[[-]<+>>>[-]>[-]<<<<<<<<<<<[->>>>>>>>>>>+<+<<<<<<<<<<]>>>>>>>>>>>[-<<<<<<<<<<<+>>>>>>>>>>>][-]+[->[-]>[-]<<<<<<<[->>>>>>>+<+<<<<<<]>>>>>>>[-<<<<<<<+>>>>>>>][-]>[-]<<<<
[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[->[-]>[-]<<<[->>>+<+<<]>>>[-<<<+>>>]<[[-]<<->>]<][-]+<[[-]>-<]>[[-]<[-]>>[-]<<<<<<<<[->>>>>>>>+<<+<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>]<<[-<<->>]<+>>]<<][-]>[-]<<[->>+<+<]>>[-<<+>>][-]+<[[-]>-<]>[[-]<<<<<<<<[-]+>>[-]>>>>>[-]>>[-]<<<<<<<<<<<<<[->>>>>>>>>>>>>+<<+<<<<<<<<<<<]>>>>>>>>>>>>>[-<<<<<<<<<<<<<+>>>>>>>>>>>>>]<<[-<<<<<+>>>>>]>]<[-]>[-]<<<<<<[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>]<<<<<<+>>]<]>>>>>[-]>[-]<<<<<<<<<[->>>>>>>>>+<+<<<<<<<<]>>>>>>>>>[-<<<<<<<<<+>>>>>>>>>][-]+<[[-]>-<]>[[-]<[-]>>[-
]>[-]<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>+<+<<<<<<<<<<<<<<]>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>]<[-<<+>>][-]>[-]>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<][-]>>>[-]<<[->>+<<<+>]>>[-<<+>>][-]+<<<[[-]>>>-<<<]>[[-]>>>[-]>[-]<<<<<<<<[->>>>>>>>+<+<<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>]>[-]<[-]+[->>[-]>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[-<+<+>>]<[->+<]
  [-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<<+>[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<->>>]<<+>>>]<<<]<[-]>>>[-]>>>[-]<<<<[->>>>+<<<+<]>>>>[-<<<<+>>>>]<<<[-<<<+>>>]<<[-]>[-]<<[->>+<+<]>>[-<<+>>]<++++++++++++++++++++++++++++++++++++++++++++++++.>[-]>[-]<<<<<<<<<<[->>>>>>>>>>+<+<<<<<<<<<]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>][-]+[->[-]>>[-]>[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[-<+<<+>>>]<[->+<][-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>]<<[->>[-]>[-]<<<<<[->>>>>+<+<<<<]>>>>>[-<<<<<+>>>>>]<[[-]<<<<->>>>]<<][-]+<<[[-]>>-<<]>>[[-]<<[-]>>>>[-]<[->+<<<<+>>>]>[-<+>]<<<<[-<<->>]<+>>>]<<<][-]>[-]<<[->>+<+<]>>[-<<+>>]>>[-]<<[-]+[->>>>[-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<<<[->>>>>>>>+<<+<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<->>>]<<][-]+<[[-]>-<]>[[-]<<<+>>[-
]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<<<->>>>>]<<<<+>>>>>]<<<<<]<[-]>>>>>[-]>>>[-]<<<<<[->>>>>+<<<+<<]>>>>>[-<<<<<+>>>>>]<<<[-<<<<<+>>>>>]<<<<[-]>>[-]<<<[->>>+<<+<]>>>[-<<<+>>>]<<++++++++++++++++++++++++++++++++++++++++++++++++.<<<<<<<]>>[[-]>>>>>>>[-]>>[-]>[-]++++++++++[-<+<<+>>>]<[->+<][-]>>>[-]<<<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>>>+<<<+<<<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>>]<<<[->>>[-]>[-]<<<<<<[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>]<[[-]<<<<<->>>>>]<<<][-]+<<[[-]>>-<<]>>[[-]<<[-]>>>>>[
-]<<<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>>>+<<<<<+<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>>]>[-]<[-]+[->>[-]>[-]>[-]++++++++++[-<+<+>>]<[->+<][-]>>[-]<<<<<<<<<<[->>>>>>>>>>+<<+<<<<<<<<]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>]<<[->>[-]>[-]<<<<[->>>>+<+<<<]>>>>[-<<<<+>>>>]<[[-]<<<
->>>]<<][-]+<[[-]>-<]>[[-]<<+>[-]>>>[-]<[->+<<<+>>]>[-<+>]<<<[-<<<<<<<->>>>>>>]<<+>>>]<<<]<<<<<[-]>>>>>>>[-]>>>[-]<<<<[->>>>+<<<+<]>>>>[-<<<<+>>>>]<<<[-<<<<<<<+>>>>>>>]<<[-]>[-]<<<<<<[->>>>>>+<+<<<<<]>>>>>>[-<<<<<<+>>>>>>]<+++++
+++++++++++++++++++++++++++++++++++++++++++.<<<]<<<<<<<<<]<<[-]>>[-]<<<<<<[->>>>>>+<<+<<<<]>>>>>>[-<<<<<<+>>>>>>][-]+[->>>>>>>>>[-]>>>>[-]>[-]++++++++++[-<+<<<<+>>>>>]<[->+<][-]>>[-]<<<<<<<<<<<<<<<<<[->>>>>>>>>>>>>>>>>+<<+<<<<<<<<<<<<<<<]>>>>>>>>>>>>>>>>>[-<<<<<<<<<<<<<<<<<+>>>>>>>>>>>>>>>>>]<<[->>[-
]>>[-]<<<<<<<<[->>>>>>>>+<<+<<<<<<]>>>>>>>>[-<<<<<<<<+>>>>>>>>]<<[[-]<<<<<<->>>>>>]<<][-]+<<<<[[-]>>>>-<<<<]>>>>[[-]<<<<[-]>>>>>>[-]<[->+<<<<<<+>>>>>]>[-<+>]<<<<<<[-<<<<<<<<<<<->>>>>>>>>>>]<<<<<<<<<+>>>>>>>>>>>>>]<<<<<<<<<<<<<]
[-]>>>>>>>>>[-]<<<<<<<<<<<[->>>>>>>>>>>+<<<<<<<<<+<<]>>>>>>>>>>>[-<<<<<<<<<<<+>>>>>>>>>>>]<<<<<<<<<++++++++++++++++++++++++++++++++++++++++++++++++.<<<<<<[-]++++++++++++++++++++++++++++++++.>]<[-]>[-]<<<<<<<<<<<<<[->>>>>>>>>>>>>+<+<<<<<<<<<<<<]>>>>>>>>>>>>>[-<<<<<<<<<<<<<+>>>>>>>>>>>>>]<<<<<<<<<<<<<+>>]<]>>>>>>>>>>>>[-]++++++++++.`,
  },
];

export interface SampleProgram {
  name: string;
  code: string;
}
