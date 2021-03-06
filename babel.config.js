module.exports = {
  presets: [
    require.resolve('@babel/preset-env', {
      targets: {
        node: 'current',
      },
    }),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    [
      require.resolve('@babel/plugin-transform-runtime'),
      { corejs: { version: 3, proposals: true } },
    ],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ],
};
