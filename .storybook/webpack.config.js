const resolver = require ('babel-plugin-module-resolver');
const path = require ('path');
const TSDocgenPlugin = require ('react-docgen-typescript-webpack-plugin');
module.exports = (storybookBaseConfig, env, config) => {
  storybookBaseConfig.module.rules.push ({
    test: /\.(ts|tsx)$/,
    loader: require.resolve ('awesome-typescript-loader'),
  });
  storybookBaseConfig.plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ];

  storybookBaseConfig.plugins.push (new TSDocgenPlugin ()); // optional
  storybookBaseConfig.resolve.extensions.push ('.ts', '.tsx');
  // storybookBaseConfig.resolve.alias = {
  //   '@/*': path.resolve (__dirname, '../src/*'),
  // };
  return storybookBaseConfig;
};
