const Koa = require("koa");
const logger = require("koa-logger");
const koaBody = require("koa-body");
const views = require("koa-views");
const path = require("path");
const router = require("@koa/router")(); 
const sentiment = require("./services/sentiment.service");

const server = (function () {
  "use strict";

  const app = new Koa();
  app.use(logger());
  app.use(koaBody());
  app.use(views(path.join(__dirname, '/views')));

  router.get('/', async (ctx) => {
    await ctx.render('home');
  })
    .post('/analysis', async (ctx) => {
      const { request } = ctx;
      const { body } = request;
      const { text } = body;
      const analysis = await sentiment.annotate(text);
      ctx.body = { analysis };
    })

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(1000);

})();

// module.exports = server;