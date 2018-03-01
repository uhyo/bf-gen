import * as path from 'path';
import express from 'express';
import expressSession from 'express-session';
import config from 'config';
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import { LanguageDefinition } from '@uhyo/bf-gen-defs';

// Initialize passport.
passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.get('twitter.consumerKey'),
      consumerSecret: config.get('twitter.consumerSecret'),
      callbackURL: config.get('http.origin') + '/auth/twitter/callback',
    },
    (token, tokenSecret, profile, done) => {
      done(null, profile);
    },
  ),
);
passport.serializeUser((user: any, done) => {
  done(null, {
    id: user.id,
    displayName: user.displayName,
  });
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

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
  // session
  app.use(
    expressSession({
      secret: config.get('http.secret'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  // passports
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.render('index');
  });
  app.get('/new', (req, res) => {
    res.render('new');
  });
  app.get('/new/step2', (req, res) => {
    // XXX auth!
    res.render('new-step2');
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

  // Twitter authentication endpoints
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/new/step2',
      failureRedirect: '/',
    }),
  );

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
