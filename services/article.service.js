const db = require("../db");
const schemas = require("../db/schemas");
const { v4: uuidv4 } = require("uuid");

const articleService = (function () {
  "use strict";
  
  return {
    async createArticles(articles) {
      const toClasses = articles.map((articleObject) => {
        const id = uuidv4();
        const article = new schemas.Article(article.title, article.author, article.body, article.publicationDate, article.entities, article.sentiment, id);
        return article;
      });

      const dbResponse = await db.postMany("articles", toClasses);

      // todo: update source with article
      // todo: update source sentiment with article sentiment
      // todo: link article with ref to source.
    }
  }
})();

module.exports = articleService;