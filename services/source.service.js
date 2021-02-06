const db = require("../db");
const schemas = require("../db/schemas");
const { v4: uuidv4 } = require("uuid");

const sourceService = (function () {
  return {
    async createSources(sources) {
      const classes = sources.map((sourceObject) => {
        const id = uuidv4();
        return new schemas.Source(
          sourceObject.name,
          sourceObject.articles,
          sourceObject.sentiment,
          id
        );
      });

      const dbResponse = await db.postMany("sources", classes);
      return dbResponse; 
    }
  }
})();

(async function () {
  await sourceService.createSources(
    [
      {
        name: "NYT",
        articles: [],
        sentiment: null
      }
    ]
  )
})();