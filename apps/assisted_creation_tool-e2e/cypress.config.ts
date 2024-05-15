import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run assisted_creation_tool:serve',
        production: 'nx run assisted_creation_tool:preview',
      },
      ciWebServerCommand: 'nx run assisted_creation_tool:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
