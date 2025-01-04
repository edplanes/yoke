import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { generate } from 'rxjs';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'edplanes',
          name: 'yoke'
        },
        generateReleaseNotes: true,
        prerelease: true
      }
    }
  ],
}