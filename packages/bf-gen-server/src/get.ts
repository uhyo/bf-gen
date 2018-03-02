import { ObjectId } from 'mongodb';
import { languageCollection, LanguageDoc } from './db';

/**
 * Retrieve a language from db.
 */
export async function loadLanguage(id: string): Promise<LanguageDoc | null> {
  const coll = await languageCollection();

  const doc = await coll.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  return doc;
}

/**
 * Get language by hash.
 */
export async function getByHash(hash: string): Promise<string | null> {
  const coll = await languageCollection();

  const doc = await coll.findOne(
    {
      hash,
    },
    {
      projection: { _id: 1 },
    },
  );

  return doc && doc._id.toHexString();
}
