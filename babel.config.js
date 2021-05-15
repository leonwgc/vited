module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const rt = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
    ].filter(Boolean),
  };

  return rt;
};
