const path = require('path');

const config = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js' ]
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};


const extensionConfig = Object.assign({}, config, {
  name: "extensionConfig",
  entry: './src/extension/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'extension')
  }
});

const webUiConfig = Object.assign({}, config, {
  name: "webUiConfig",
  entry: './src/webui/index.ts',
  output: {
    filename: 'pop.js',
    path: path.resolve(__dirname, 'extension')
  }
});

const optionpageConfig = Object.assign({}, config, {
  name: "optionpageConfig",
  entry: './src/optionpage/index.tsx',
  output: {
    filename: 'options.js',
    path: path.resolve(__dirname, 'extension')
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
});


module.exports = [
  extensionConfig,
  webUiConfig,
  optionpageConfig
];
