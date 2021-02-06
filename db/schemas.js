const { v4 } = require("uuid");

class Source { 
  constructor(name, articles, sentiment) {
    this.name = name;
    this.articles = articles;
    this.sentiment = sentiment;
    this.id = v4();
  }
}

class Article { 
  constructor(title, author, body, publicationDate, entities, sentiment) {
    this.title = title;
    this.author = author;
    this.body = body;
    this.publicationDate = publicationDate; 
    this.sentiment = sentiment; 
  }
}

class SentimentScore { 
  constructor(score, magnitude, ) {

  }
}