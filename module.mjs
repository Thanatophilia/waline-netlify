import { module } from '@prisma/composer';
import { rawPostgres } from '@prisma/composer-prisma-cloud';
import comment from './service.mjs';

export default module('ning', ({ provision }) => {
  const db = provision(rawPostgres({ name: 'db' }));
  provision(comment, { deps: { db } });
});
