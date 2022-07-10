import browserify from 'browserify';
import watchify from 'watchify';
import tsify from 'tsify';
import fs from 'node:fs';
import path from 'node:path';
import http from 'http';
import handler from 'serve-handler';

const publicDir = 'public';
const sourceFile = 'src/index.tsx';
const destinationDir = 'dist';

const watch = process.argv.includes('-w');

const uniqueString = () => Math.random().toString(36).substring(2, 9);

const publicFiles = fs.readdirSync(publicDir);

const b = browserify({
  entries: [sourceFile],
  cache: {},
  packageCache: {},
  plugin: [watch && watchify, tsify].filter(Boolean),
});

const bundle = () => {
  console.log('Compilation from ' + sourceFile + ' ...');

  fs.rmSync(destinationDir, { force: true, recursive: true });

  b.bundle(
    /**
     * @param {Error?} error
     * @param {Buffer?} buffer
     */
    (error, buffer) => {
      if (error) {
        console.error(error.toString());
        return;
      }

      if (!buffer) {
        return;
      }

      console.log('Code compiled. Updating ' + destinationDir + ' directory.');

      const fileContent = buffer.toString('utf8');

      fs.mkdirSync(destinationDir, { recursive: true });
      const fileID = uniqueString();
      fs.writeFileSync(
        path.join(destinationDir, `/index.${fileID}.js`),
        fileContent
      );

      publicFiles.forEach((fileName) => {
        if (fileName.endsWith('.html')) {
          const htmlContent = fs
            .readFileSync(path.join(publicDir, fileName), { encoding: 'utf-8' })
            .replace('index.js', `index.${fileID}.js`);

          fs.writeFileSync(path.join(destinationDir, fileName), htmlContent);
        } else {
          fs.copyFileSync(
            path.join(publicDir, fileName),
            path.join(destinationDir, fileName)
          );
        }
      });

      console.log('Directory ' + destinationDir + ' filled.');

      if (watch) {
        console.log('\nWaiting for code changes...');
      }
    }
  );
};

if (watch) {
  b.on('update', bundle);

  const server = http.createServer((request, response) =>
    handler(request, response, {
      public: destinationDir,
      rewrites: [
        {
          source: '*',
          destination: 'index.html',
        },
      ],
    })
  );
  server.listen(3000, () => {
    console.log('Starting up http-server, serving ' + destinationDir);

    bundle();
  });
} else {
  bundle();
}
