const db = require("./config");
const methods = (function () {
  "use strict";

  return {
    async get(collection, documentId) {
      const documentReference = db.collection(collection)
        .doc(documentId);
      
      const document = await documentReference.get();
      const { data } = document; 
      return data();
    },
    async getMany(collection, queries) {
      const collectionReference = db.collection(collection);
      if (queries) {
        queries.forEach((query) => {
          const { field, operator, value } = query;
          collectionReference.where(field, operator, value);
        });
      }
      
      const records = [];
      const documents = await collectionReference.get();
      documents.forEach((document) => {
        const { data } = document;
        records.push(data());
      });
      return records;
    },
    async postMany(collection, documents) {
      const collectionReference = db.collection(collection);
      
    }
  }
})();

module.exports = methods;