let Service = require("egg").Service;
let configWebpack = require("../../webpack.config");
let webpack = require("webpack");
let fs = require("fs");
let path = require("path");
let count = 0

module.exports = app => {
    return class TemplateService extends Service {
        async index(params) {

            if (count == 0) {
                configWebpack.plugins.push(new webpack.DefinePlugin({
                    'process.env': JSON.stringify(params)
                }));
            }else{
                configWebpack.plugins.pop();
                configWebpack.plugins.push(new webpack.DefinePlugin({
                    'process.env': JSON.stringify(params)
                }));
            }
            count++;

            return new Promise(
                (resolve, reject) => {
                    let complier = webpack(configWebpack);
                    complier.run((err, stats) => {
                        if (err || stats.hasErrors()) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                }
            )
        }
        async push(params) {
            let host = app.config.myhost;
            let ctx = this.ctx;
            ctx.logger.info(host,"--- host");
            ctx.logger.info(params.bid[0].creative.templateId,"--- params");
            return ctx.curl(`${host}/agent/dsp/creative/nonstandard/specification/push`, {
                method: 'POST',
                contentType: 'json',
                data: {
                    "js_content": fs.readFileSync(path.resolve(configWebpack.output.path, "./index.js"), "utf8"),
                    "template_id": params.bid[0].creative.templateId
                },
                dataType: 'json',
            });
        }
    }
}