import jwt from 'jsonwebtoken';
import objectHash from 'object-hash';
import config from 'config';
import { LanguageDefinition, Owner } from '@uhyo/bf-gen-defs';

/**
 * Issue a JWT for Twitter user.
 */
export function issueJwt(user: Owner): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        type: 'twitter',
        id: user.id,
        displayName: user.displayName,
        profileImage: user.profileImage,
      },
      config.get('jwt.secret'),
      {
        expiresIn: '1d',
        issuer: config.get('jwt.issuer'),
      },
      (err, token) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(token);
        }
      },
    );
  });
}

/**
 * Generate a hash of language definition.
 */
export function languageHash(lang: LanguageDefinition): string {
  return objectHash(lang.ops);
}
