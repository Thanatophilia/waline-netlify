import nodeBuild from '@prisma/composer/node';
import { compute, rawPostgres } from '@prisma/composer-prisma-cloud';

export default compute({
  name: 'comment',
  deps: { db: rawPostgres() },
  build: nodeBuild({
    module: import.meta.url,
    dir: './dist',
    entry: './server.mjs',
  }),
});
