const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";
  config.externals = {jquery: "jQuery"};

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;
  config.plugins.push(new BundleAnalyzerPlugin());
  if (env.production) {
    console.log(config);
    config.output.libraryTarget = "umd";
    let {rule} = helpers.getLoadersByName(config, "css-loader")[0];
    //console.log(rule);
    rule.loader[1] = {
      loader: "style-loader",
      options: {
        outputStyle: "compressed"
      }
    }
    rule.loader[2].options.localIdentName = '[sha1:hash:hex:5]';
    console.log(rule.loader[3].options)
    let { plugin } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
   // plugin.options.sourceMap = false
   //config.plugins.push(new BundleAnalyzerPlugin({analyzerMode:"static", generateStatsFile: true}));
   
  }
  
};
