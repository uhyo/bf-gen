import { MongoClient, Collection, ObjectId } from 'mongodb';
import config from 'config';
import { LanguageDefinition } from '@uhyo/bf-gen-defs';

// Connection pool
let client: MongoClient | null = null;

// name of collection.
const collection = 'languages';

/**
 * Doc of language in the db.
 */
export interface LanguageDoc {
  /**
   * Owner as Twitter id.
   */
  owner: {
    id: string;
    displayName: string;
    profileImage: string;
  };
  /**
   * language definition.
   */
  lang: LanguageDefinition;
  /**
   * Hash of language definition.
   */
  hash: string;
  /**
   * Date when this is created.
   */
  created: Date;
}

/**
 * Get a new or existing connection to MongoDB.
 */
async function getClient(): Promise<MongoClient> {
  if (client != null) {
    return client;
  }

  // MongoDB connection URL
  const user = encodeURIComponent(config.get('db.user'));
  const password = encodeURIComponent(config.get('db.password'));
  const host = config.get('db.host');
  const port = config.get('db.port');
  const db = config.get('db.db');
  const url = `mongodb://${user}:${password}@${host}:${port}/${db}?w=1`;

  const cl = await MongoClient.connect(url);

  client = cl;
  return cl;
}

/**
 * Initialize a DB.
 */
export async function initDB(): Promise<void> {
  const cl = await getClient();
  const db = cl.db(config.get('db.db'));
  const col = db.collection(collection);

  await col.createIndexes([
    {
      key: { 'owner.id': 1 },
    },
    {
      key: { hash: 1 },
      unique: true,
    },
    {
      key: { created: 1 },
    },
  ]);
  console.log('Connected to MongoDB');
}

/**
 * Get a language collection.
 */
export function languageCollection(): Promise<Collection> {
  return getClient().then(client =>
    client.db(config.get('db.db')).collection(collection),
  );
}
