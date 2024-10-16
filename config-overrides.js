module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.wasm$/,
    type: "javascript/auto",
    loader: "file-loader",
    options: {
      name: "static/wasm/[name].[hash:8].[ext]",
    },
  });

  config.resolve.fallback = {
    fs: false,
    path: false,
    crypto: false,
    child_process: false,
    worker_threads: false,
    perf_hooks: false,
    os: false,
    stream: false,
  };

  return config;
};
