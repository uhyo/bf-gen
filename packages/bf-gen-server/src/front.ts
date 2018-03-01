import * as path from 'path';
import express from 'express';
import config from 'config';

import { LanguageDefinition } from '@uhyo/bf-gen-defs';

/**
 * Start the web server.
 */
export function start(): void {
  // Port to listen.
  const port: number = config.get('http.port');

  // Instantiate an express app.
  const app = express();

  // app config.
  app.set('view engine', 'pug');
  // static moddleware
  app.use(
    '/static',
    express.static(
      config.has('static.path')
        ? config.get('static.path')
        : // for development
          path.join(__dirname, '../../bf-gen-client/dist'),
    ),
  );

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/test', (req, res) => {
    const lang: LanguageDefinition = {
      name: '最強の難解プログラミング言語「Brainfuck」',
      name_short: 'Brainfuck',
      description: 'Urban Müllerが1993年に考案したプログラミング言語です。',
      ops: {
        '+': '+',
        '-': '-',
        '<': '<',
        '>': '>',
        '.': '.',
        ',': ',',
        '[': '[',
        ']': ']',
      },
    };

    res.render('lang', {
      lang,
    });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
