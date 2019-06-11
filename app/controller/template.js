let Controller = require("egg").Controller;


module.exports = (app) => {
    return class TemplateController extends Controller {
        async index() {
            let params = this.ctx.request.body;
            let ctx = this.ctx;
            try {
                await ctx.service.template.index(params);
                let res  = await ctx.service.template.push(params);
                let result = res.data;
                ctx.logger.info(result,"---result from CDNpushAPI");
                if(result.code ===0){
                    ctx.body = {
                        code: 0,
                        message: "ok"
                    };
                }else{
                    ctx.body = {
                        code: -1,
                        message: "failed"
                    };
                }

            } catch (e) {
                ctx.body = {
                    code: -1,
                    message: "failed"
                };
            }

        }
    }
}