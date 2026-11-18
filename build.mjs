import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// The app entry and the service declaration it imports run from the build output.
for (const file of ['server.mjs', 'service.mjs']) {
  cpSync(path.join(root, file), path.join(dist, file));
}

// The server runs from source with its packages: copy the installed packages
// verbatim, minus the prisma CLI and .bin links (never resolved at runtime).
cpSync(path.join(root, 'node_modules'), path.join(dist, 'node_modules'), {
  recursive: true,
  filter: (source) => {
    const base = path.basename(source);
    if (base === '.bin') return false;
    if (base === 'prisma' && path.basename(path.dirname(source)) === 'node_modules') {
      return false;
    }
    return true;
  },
});
