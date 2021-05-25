module.exports = {
  presets: [
    require.resolve('@babel/preset-env', {
      targets: {
        node: '10',
      },
    }),
    ['@babel/preset-react'],
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [[require.resolve('@babel/plugin-transform-runtime')]],
};
