module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', {"runtime": "automatic"}],'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
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
};
