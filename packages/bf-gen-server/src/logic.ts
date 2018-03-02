import jwt from 'jsonwebtoken';
import objectHash from 'object-hash';
import config from 'config';
import { LanguageDefinition } from '@uhyo/bf-gen-defs';

export interface TwitterUser {
  id: string;
  displayName: string;
  profileImage: string;
}
/**
 * Issue a JWT for Twitter user.
 */
export function issueJwt(user: TwitterUser): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        type: 'twitter',
        id: user.id,
        displayName: user.displayName,
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
