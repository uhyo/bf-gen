import { start } from './front';
import { initDB } from './db';

initDB()
  .then(() => start())
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
