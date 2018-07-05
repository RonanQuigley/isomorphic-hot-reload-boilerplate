import { exec } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';
import { red } from 'colors';

const dir = path.resolve(
    __dirname,
    '../../server/graphql/database/datamodel.graphql'
);

const watcher = chokidar.watch(dir);

watcher.on('ready', () => {
    watcher.on('change', () => {
        const prisma = exec('npm run prisma');
        prisma.stdout.on('data', data => {
            console.log(`${data}`);
        });
        prisma.stderr.on('error', data => {
            console.log(`ERROR:`.red + ` ${data}`);
        });
        prisma.on('close', code => {
            console.log(`child process exited with code ${code}`);
        });
    });
});
