const language = require("@google-cloud/language");
const path = require("path");
const fs = require("fs");

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
      const json = JSON.stringify(result);
      fs.writeFileSync(path.join(__dirname, "./example.json"), json);
      console.log(result)
      return result;
    },
  }
})();

sentiment.annotate(`The House on Thursday took the extraordinary step of ousting a lawmaker from two congressional committees, exiling Representative Marjorie Taylor Greene of Georgia for endorsing the executions of Democrats and spreading dangerous and bigoted misinformation even as her fellow Republicans rallied around her.

In a move without precedent in the modern Congress, the House voted 230 to 199— over near-unanimous Republican opposition — to remove Ms. Greene from the Education and Budget Committees.

The move effectively stripped Ms. Greene of her influence in Congress by banishing her from committees critical to advancing legislation and conducting oversight. Party leaders traditionally control the membership of the panels, and while Democrats and Republicans have occasionally moved to punish their own members by stripping them of assignments, the majority has never in modern times moved to do so to a lawmaker in the other party.

Democrats argued that Ms. Greene’s comments — and Republican leaders’ refusal to take action against her themselves — had created an untenable situation that required the unusual action. In social media posts made before she was elected, Ms. Greene endorsed executing top Democrats, including Speaker Nancy Pelosi; suggested a number of school shootings were secretly perpetrated by government actors; and repeatedly trafficked in anti-Semitic and Islamophobic conspiracy theories.

The vote came a day after Representative Kevin McCarthy of California, the Republican leader, released a statement that condemned Ms. Greene’s past comments endorsing violent behavior and conspiracy theories — but made clear that the party did not intend to punish her. Eleven House Republicans voted to affirm the resolution.

“You would think that the Republican leadership in the Congress would have some sense of responsibility to this institution,” Ms. Pelosi said at a news conference on Thursday. “For some reason, they’ve chosen not to go down that path.”

In wide-ranging and emotional remarks on the House floor on Thursday, Ms. Greene, who represents the 14th congressional district in Georgia, expressed regret for her previous comments. She said that she believed the Sept. 11 attacks “absolutely happened” and that school shootings were “absolutely real,” after previously suggesting aspects of both were staged.

“I was allowed to believe things that weren’t true and I would ask questions about them and talk about them, and that is absolutely what I regret,” Ms. Greene said, wearing a mask embroidered with the phrase “FREE SPEECH.”

“When I started finding misinformation, lies, things that were not true in these QAnon posts, I stopped believing it,” she said, adding that her revelation came in 2018. “Any source of information that is a mix of truth and a mix of lies is dangerous.”

She did not apologize over the course of the roughly eight-minute speech, but portrayed her previous comments as “words of the past” that “do not represent me.” She warned that lawmakers were creating a “big problem” if they chose to “crucify” her for “words that I said, and that I regret, a few years ago.”

Her contention that she broke away from QAnon in 2018 also does not square with a series of posts she made in 2019 and other social media activity from that time, including liking a Facebook comment that endorsed shooting Ms. Pelosi in the head and suggesting in the same year that Justice Ruth Bader Ginsburg had been replaced with a body double.

Ms. Greene’s comments are likely to assuage some in the Republican conference, but Democrats immediately indicated that they were not impressed.

“I just have to say that I did not hear an apology or denouncement for the claim, the insinuation that political opponents should be violently dealt with,” said Representative Jim McGovern, Democrat of Massachusetts and the chairman of the Rules Committee. “I didn’t hear anybody apologize or retract the anti-Semitic and Islamophobic remarks that have been made, that have been posted, over and over again.”

The step of stripping a House member of committee assignments is usually reserved for lawmakers who are facing indictments or criminal investigations or who have otherwise broken with their party in a particularly egregious way. Mr. McCarthy in 2019 stripped former Representative Steve King of Iowa of his committee posts after an interview with The New York Times in which he questioned why the term “white supremacist” was considered offensive.`)