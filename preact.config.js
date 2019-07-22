export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";
  config.externals = {jquery: "jQuery"};

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    config.output.libraryTarget = "umd";
    let {rule} = helpers.getLoadersByName(config, "css-loader")[0];
    rule.loader[2].options.localIdentName = '[sha1:hash:hex:5]';
    let { plugin } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
  //  plugin.options.sourceMap = false
  }
};
