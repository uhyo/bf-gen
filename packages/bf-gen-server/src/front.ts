import express from 'express';
import config from 'config';

/**
 * Start the web server.
 */
export function start(): void {
  // Port to listen.
  const port: number = config.get('http.port');
  // Instantiate an express app.

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
