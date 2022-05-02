module.exports = function (api) {
  api.cache(false);
  const env =  {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'MY_ENV', 
          moduleName: '@env',
          path: '../server/.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
  return env
};