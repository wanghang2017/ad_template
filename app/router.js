module.exports = (app)=>{
    let {router,controller} = app;
    router.post("/api/template/create",controller.template.index);
}