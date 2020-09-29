import { realpathSync } from 'fs';
import { resolve } from 'path';

export const appDirectory = realpathSync(process.cwd());
export const resolveCwd = (relativePath) => resolve(appDirectory, relativePath);
export const docs = resolveCwd('docs');
export const src = resolveCwd('src');
export const scripts = resolveCwd('scripts');
