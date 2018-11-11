import * as JSZip from 'jszip';

import { LanguageDefinition } from '@uhyo/bf-gen-defs';

import { operators } from '../bf/ops';

/**
 * Generate a zip archive for interpreter of given language.
 */
export function generateCLI(def: LanguageDefinition): Promise<Blob> {
  const Jz: JSZip = require('jszip');
  const archive = new Jz();
  archive.file('package.json', JSON.stringify(packageJson(def)));
  archive.file('index.js', generateIndex(def), {
    unixPermissions: '755',
  });
  archive.file('README.md', readme(def));

  return archive.generateAsync({ type: 'blob' });
}

/**
 * Generate the readme file.
 */
function readme({ name, name_short, description }: LanguageDefinition): string {
  return `# ${name}
${description}

## インストール
1. このディレクトリで\`npm install\`を実行することで依存モジュールをインストールします。
2. 必要に応じてindex.jsを実行可能にしてパスを通してください。

## 使い方
${name_short}プログラムのファイル名を指定することで、そのプログラムを実行します。

\`\`\`sh
node index.js helloworld.txt
\`\`\`

引数に\`-\`を指定することで、標準入力からプログラムを受け取ることができます。

\`\`\`sh
cat helloworld.txt | node index.js
\`\`\`
`;
}

/**
 * Generate the content of package.json.
 */
function packageJson({ description }: LanguageDefinition): Object {
  return {
    name: 'interpreter',
    version: '1.0.0',
    description,
    main: 'index.js',
    license: 'MIT',
    dependencies: {
      'bf-wasm': '^0.1.0',
    },
  };
}

/**
 * Generate the content of index.js.
 */
function generateIndex({ ops }: LanguageDefinition): string {
  return `#! /usr/bin/env node
  const fs = require('fs');
  const { BFInterpreter } = require('bf-wasm');
  const operators = ${JSON.stringify(operators)};
  const tokens = ${JSON.stringify(ops)};

  (async ()=> {
    const sourceFile = process.argv[2];
    if (!sourceFile) {
      throw new Error('Source file is not specified');
    }
    process.stdin.setEncoding('utf8');
    const source = fs.readFileSync(sourceFile === '-' ? '/dev/stdin' : sourceFile, 'utf8');
    const parsed = [...tokenize(source)].join('');

    let userInputStream = null;
    const getInput =
      sourceFile === '-' ? ()=> {
        if (userInputStream == null) {
          userInputStream = process.stdin[Symbol.asyncIterator]();
        }
        return userInputStream.next().then(({value})=> value != null ? value :  '\x00');
      } : () => '\x00';

    const int = new BFInterpreter(parsed, getInput);
    for await (const chr of int.run()) {
      process.stdout.write(String.fromCharCode(chr));
    }
  })().catch(err => {
    console.error(err);
    process.exit(1);
  });

  /**
   *
   */
  function *tokenize(code) {
    const cache = new Map(operators.map(op => [op, -Infinity]));
    const length = code.length;
    if (length > 0x7fffffff) {
      throw new Error('Input source code is too long');
    }
    let index = 0;
    while (index < length) {
      let min = 0x7fffffff;
      let next = null;
      for (const op of operators) {
        const c = cache.get(op);
        if (c < index) {
          const i = code.indexOf(tokens[op], index);
          if (i === -1) {
            cache.set(op, Infinity);
            continue;
          }
          cache.set(op, i);
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
        return;
      }
      yield next;
      index = min + tokens[next].length;
    }
  }
 `;
}
