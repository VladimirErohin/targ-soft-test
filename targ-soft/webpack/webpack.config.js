const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
//const {re} = require("@babel/core/lib/vendor/import-meta-resolve");

module.exports = (envVars) => {
    const {env} = envVars
    const envConfig = require(`./webpack.${env}.js`)
    const config = merge(commonConfig, envConfig)
    return config
}