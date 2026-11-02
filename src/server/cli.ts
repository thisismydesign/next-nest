import { CommandFactory } from 'nest-commander';

import { CommandsModule } from './commands/commands.module.js';

await CommandFactory.run(CommandsModule, ['warn', 'error']);
