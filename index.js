const Koa = require("koa");
const logger = require("koa-logger");
const router = require("@koa/router");
const koaBody = require("koa-body");

const server = (function () {
  "use strict";

  const app = new Koa();
  app.listen(1000);

})();

module.exports = server;