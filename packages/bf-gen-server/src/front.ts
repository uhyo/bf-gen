import * as path from 'path';
import express from 'express';
import expressSession from 'express-session';
import expressCacheController from 'express-cache-controller';
import bodyParser from 'body-parser';
import config from 'config';
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { LanguageDefinition, Owner } from '@uhyo/bf-gen-defs';

import { issueJwt } from './logic';
import { publish } from './publish';
import { loadLanguage, getByHash, getRecent } from './get';

const staticPath: string = config.has('static.path')
  ? config.get('static.path')
  : path.join(__dirname, '../../bf-gen-client/dist');

// Initialize passport.
passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.get('twitter.consumerKey'),
      consumerSecret: config.get('twitter.consumerSecret'),
      callbackURL: config.get('app.origin') + '/auth/twitter/callback',
    },
    (token, tokenSecret, profile, done) => {
      done(null, {
        id: profile.id,
        displayName: profile.displayName,
        profileImage:
          profile.photos && profile.photos[0]
            ? profile.photos[0].value
            : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
      });
    },
  ),
);
passport.use(
  new JwtStrategy(
    {
      secretOrKey: config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: config.get('jwt.issuer'),
    },
    (payload, done) => {
      done(null, {
        type: payload.type,
        id: payload.id,
        displayName: payload.displayName,
        profileImage: payload.profileImage,
      });
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, {
    id: user.id,
    displayName: user.displayName,
    profileImage: user.profileImage,
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

  // load static assets manifest
  const manifest = require(path.join(staticPath, 'manifest.json'));

  // local data for template engines.
  app.locals.app = config.get('app');
  app.locals.manifest = manifest;

  // app config.
  app.set('view engine', 'pug');
  // static moddleware
  app.use(
    '/static',
    express.static(staticPath, {
      maxAge: '30d',
    }),
  );
  app.use(
    expressCacheController({
      public: true,
      noCache: true,
    }),
  );
  app.use(bodyParser.json());
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
    res.cacheControl = {
      maxAge: 180,
    };
    getRecent()
      .catch(() => [])
      .then(recent => {
        res.render('new', {
          recent,
        });
      });
  });
  app.get('/new/step2', (req, res, next) => {
    if (req.user == null) {
      res.redirect(303, '/');
      return;
    }
    res.cacheControl = {
      private: true,
    };
    issueJwt(req.user as Owner)
      .then(token => {
        res.render('new-step2', {
          token,
          limit: config.get('limit'),
          owner: req.user,
        });
      })
      .catch(next);
  });
  // API endpoint for publishing
  app.post('/new/publish', passport.authenticate('jwt'), (req, res, next) => {
    res.cacheControl = {
      private: true,
    };
    const lang = req.body && req.body.lang;
    const user = req.user as Owner;
    if (lang == null || user == null) {
      res.sendStatus(400);
      return;
    }

    publish(user, lang)
      .then(obj => {
        // Successfully published
        res.json(obj);
      })
      .catch(next);
  });

  // Show language.
  app.get('/lang/:id([0-9a-fA-F]{1,})', (req, res, next) => {
    const { id } = req.params;

    loadLanguage(id)
      .then(doc => {
        if (doc == null) {
          res.sendStatus(404);
          return;
        }

        res.cacheControl = {
          maxAge: 3600,
        };
        res.render('lang', {
          langid: id,
          lang: doc.lang,
          owner: doc.owner,
        });
      })
      .catch(next);
  });
  // Find-by-hash API
  app.get('/hash/:hash([0-9a-fA-F]{1,})', (req, res, next) => {
    const { hash } = req.params;
    getByHash(hash)
      .then(id => {
        if (id == null) {
          res.sendStatus(404);
          return;
        }

        res.redirect(303, `/lang/${id}`);
      })
      .catch(next);
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
