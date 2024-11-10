module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@scenes': './src/scenes',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};
