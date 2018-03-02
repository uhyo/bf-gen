import jsonschema from 'jsonschema';
import config from 'config';

import { TwitterUser, languageHash } from './logic';
import { languageCollection, LanguageDoc } from './db';

/**
 * Result of publish.
 */
export interface PublishResult {
  /**
   * ID of language.
   */
  id: string;
  /**
   * Whether it already exists.
   */
  exists: boolean;
}
/**
 * Publish given language.
 * @returns {Promise} Promise that resolves to language id.
 */
export async function publish(
  owner: TwitterUser,
  lang: any,
): Promise<PublishResult> {
  // Validate given language.
  if (!validate(lang)) {
    throw new Error('Input value is invalid');
  }

  const hash = languageHash(lang);

  // make a language.
  const doc: LanguageDoc = {
    owner,
    lang,
    hash,
  };

  // throw into a DB.
  const coll = await languageCollection();

  // Check whether same language already exitsts.
  const d = await coll.findOne({ hash }, { projection: { hash: 1, _id: 1 } });

  if (d != null) {
    // 既に存在
    return {
      exists: true,
      id: d._id.toHexString(),
    };
  }
  // 存在しない
  // もしこの間に入っちゃったらunique indexに止めてもらう
  const res = await coll.insertOne(doc);
  const id = res.insertedId;

  return {
    exists: false,
    id: id.toHexString(),
  };
}

/**
 * Validate given object against json schema.
 */
export function validate(lang: any): boolean {
  const res = jsonschema.validate(lang, schema);
  return res.valid;
}

const schema: any = {
  $schema: 'http://json-schema.org/schema#',
  required: ['name', 'name_short', 'description', 'ops'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      maxLength: config.get('limit.name'),
    },
    name_short: {
      type: 'string',
      maxLength: config.get('limit.name'),
    },
    description: {
      type: 'string',
      maxLength: config.get('limit.description'),
    },
    ops: {
      required: ['+', '-', '<', '>', '.', ',', '[', ']'],
      properties: {
        '+': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        '-': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        '<': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        '>': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        '.': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        ',': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        '[': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
        ']': {
          type: 'string',
          maxLength: config.get('limit.op'),
        },
      },
      additionalProperties: false,
    },
  },
};
