require("dotenv").config();
const { GraphQLClient } = require("graphql-request");
const fs = require("fs");

const cms_template = require("./cms_template.json");
const {
  contentQuery,
  multiContentQuery,
  projectInformationQuery,
  bannerQuery,
  topNewsQuery,
  newsQuery,
  newsCategoryQuery,
  topEventsQuery,
  eventQuery,
  eventsCategoryQuery,
  feedbackReasonQuery,
  contactReasonQuery,
  contactAreaQuery,
} = require("./cms_query.js");

const withNameVariable = {
  content: contentQuery,
  multiContent: multiContentQuery,
  projectInformation: projectInformationQuery,
  banner: bannerQuery,
};

const withCountVariable = {
  topNews: { query: topNewsQuery, count: 3 },
  topEvents: { query: topEventsQuery, count: 5 },
};

const withSlugVariable = {
  news: { query: newsQuery, top: "topNews" },
  event: { query: eventQuery, top: "topEvents" },
};

const withoutVariable = {
  newsCategory: newsCategoryQuery,
  eventsCategory: eventsCategoryQuery,
  feedbackReason: feedbackReasonQuery,
  contactReason: contactReasonQuery,
  contactArea: contactAreaQuery,
};

module.exports.cms_backup = async function() {
  cms_client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

  cms_types = Object.keys(cms_template);
  for (let index = 0; index < cms_types.length; index++) {
    const type = cms_types[index];

    if (type in withNameVariable) {
      query = withNameVariable[type];
      const names = Object.keys(cms_template[type]);
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        variable = {
          name: name,
        };
        data = await cms_client.request(query, variable);
        cms_template[type][name] = data;
      }
    }

    if (type in withCountVariable) {
      query = withCountVariable[type].query;
      count = withCountVariable[type].count;
      variable = {
        fetchCount: count,
      };
      data = await cms_client.request(query, variable);
      cms_template[type] = data;
    }

    if (type in withSlugVariable) {
      query = withSlugVariable[type].query;
      listType = withSlugVariable[type].top;
      const list = Object.values(cms_template[listType])[0];
      for (let i = 0; i < list.length; i++) {
        const slug = list[i].slug;
        variable = {
          slug: slug,
        };
        data = await cms_client.request(query, variable);
        cms_template[type][slug] = data;
      }
    }

    if (type in withoutVariable) {
      query = withoutVariable[type];
      data = await cms_client.request(query);
      cms_template[type] = data;
    }
    console.log(`Progress...${Math.round((index / cms_types.length) * 100)}%`);
  }

  console.log(`Progress...100%\nStart generating JSON file`);

  fs.writeFile(
    "./services/cms/cms_content.json",
    JSON.stringify(cms_template, null, 4),
    "utf8",
    function(err) {
      if (err) {
        throw err;
      }
      console.log("Completed.");
    }
  );
};
