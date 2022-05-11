import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    // Name for debugging purposes - to identify the plugin
    name: 'unpkg-path-plugin',
    // Called by ESBuild.
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({
        path: 'index.js',
        namespace: 'a',
      }));

      // Handle relative paths
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        const newPath = new URL(
          args.path,
          `https://unpkg.com${args.resolveDir}/`
        ).href;
        return {
          namespace: 'a',
          path: newPath,
        };
      });

      // Handle root module files
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
