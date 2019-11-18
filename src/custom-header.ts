import { buildConfig } from './config.js';
import { observers } from './observers';

const config = buildConfig(false);
observers(config);
