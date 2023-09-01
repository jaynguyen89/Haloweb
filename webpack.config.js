const path = require('path');

module.export = {
  entry: path.resolve(__dirname, 'src/index.js'),
  resolve: {
    fallback: {
      'process/browser': require.resolve('process/browser'),
    }
  }
};
