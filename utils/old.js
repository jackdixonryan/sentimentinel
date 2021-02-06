
  const elements = {
    getAnaylsis: document.getElementById('get-analysis'),
    article: document.getElementById('article'),
    results: document.getElementById('results'),
  }

  elements.getAnaylsis.addEventListener('click', getAnalysis);

  async function getAnalysis() {
    const text = elements.article.value;
    const response = await fetch('/analysis', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ text })
    });
    const json = await response.json();
    const { analysis } = json;
    const { documentSentiment, categories, entities } = analysis;
    
    const entitiesHtml = entities.map((entity) => {
      const { sentiment, name, salience } = entity;
      const entityHtml = `
        <div class="entity">
          <h3>${name}</h3>
          <p>Sentiment: ${sentiment.score}, ${interpretSentiment(sentiment.score)}</p>
          <p>Magnitude: ${sentiment.magnitude}</p>
          <p>Significance: ${salience}</p>
        </div>
      `;
      return entityHtml;
    });

    const resultsHtml = `
      <p>Sentiment: ${ documentSentiment.score } ${ interpretSentiment(documentSentiment.score) }</p>
      <p>Magnitude: ${ documentSentiment.magnitude }</p>
      <h2>Who is involved?</h2>
      <div id="entities-list">
        ${ entitiesHtml.join("") }
      </div>
    `;

    elements.results.innerHTML = resultsHtml;

  }

  function interpretSentiment(sentimInt) {
    console.log({ sentimInt });
    switch(true) {
      case sentimInt < -0.85:
        return "Overwhelmingly Negative";
      case sentimInt < -0.70:
        return "Very Negative";
      case sentimInt < -0.55:
        return "Negative";
      case sentimInt < -0.40:
        return "Moderately Negative";
      case sentimInt < -0.25:
        return "Slightly Negative";
      case sentimInt < -0.10:
        return "Barely Negative";
      case sentimInt < 0.05:
        return "Neutral";
      case sentimInt < 0.10:
        return "Barely Postive";
      case sentimInt < 0.25:
        return "Slightly Positive";
      case sentimInt < 0.40: 
        return "Moderately Positive";
      case sentimInt < 0.55:
        return "Positive";
      case sentimInt < 0.70:
        return "Very Positive";
      case sentimInt < 0.85:
        return "Overwhelmingly Positive.";
      default: 
        return "INVALID"
    }
  }