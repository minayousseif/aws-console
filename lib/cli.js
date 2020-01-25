#!/usr/bin/env node

/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const commander = require('commander');
const { name, version, description } = require('../package.json');
const createSession = require('./createSession');

const program = new commander.Command(name);

program
  .description(description)
  .version(version)
  .option('-p, --profile <profile>', 'use an aws profile name in ~/.aws/credentials')
  .action((options) => {
    createSession(options.profile);
  })
  .parse(process.argv);
