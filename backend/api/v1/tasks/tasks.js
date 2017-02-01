/**
 * Tasks root file, they will be imported and started here
 */

import schedule from 'node-schedule';
import {repoParser} from '../admin.js';

let parse = schedule.scheduleJob('0 * * * *', repoParser);

export {schedule as default, parse};
