const language = require("@google-cloud/language");
const path = require("path");

const sentiment = (function () {
  "use strict";

  const projectId = "lazy-dnd";
  const keyFilename = path.join(__dirname, "../cert.json");
  const client = new language.LanguageServiceClient({ projectId, keyFilename });

  return {
    async analyze(text) {
      const document = {
        content: text,
        type: 'PLAIN_TEXT',
      }
      const [result] = await client.analyzeSentiment({ document });
      const sentiment = result.documentSentiment;

      console.log({ sentiment });
      console.log("Sentiment")
    },
    async analyzeEntities(text) {
      const document = {
        content: text,
        type: 'PLAIN_TEXT'
      }

      const [result] = await client.analyzeEntitySentiment({ document });
      const { entities } = result;
      console.log(entities);
    },
    async annotate(text) {
      const document = {
        content: text,
        type: 'PLAIN_TEXT'
      };

      const features = {
        extractDocumentSentiment: true,
        extractEntitySentiment: true,
        classifyText: true
      }

      const [result] = await client.annotateText({ document, features });
      return result;
    },
  }
})();

module.exports = sentiment;