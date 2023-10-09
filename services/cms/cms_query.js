const { gql } = require("graphql-request");

const contentQuery = gql`
  query($name: String!) {
    values: titledContent(where: { name: $name }) {
      content {
        html
      }
      title
    }
  }
`;

const multiContentQuery = gql`
  query($name: String!) {
    values: multiContent(where: { name: $name }) {
      contents {
        html
      }
      title
    }
  }
`;

const projectInformationQuery = gql`
  query($name: String!) {
    values: projectInformation(where: { name: $name }) {
      content {
        html
      }
      title
      linkCaption
      link
    }
  }
`;

const bannerQuery = gql`
  query($name: String!) {
    values: bannerImage(where: { name: $name }) {
      image {
        url
      }
      title
    }
  }
`;

const topNewsQuery = gql`
  query($fetchCount: Int) {
    newsList: newsItems(first: $fetchCount, orderBy: publishedDate_DESC) {
      publishedDate
      title
      image {
        url
      }
      category
      blurb
      slug
    }
  }
`;

const newsQuery = gql`
  query($slug: String!) {
    newsItem: newsItems(where: { slug: $slug }) {
      publishedDate
      title
      image {
        url
      }
      blurb
      detail {
        html
      }
    }
  }
`;

const newsCategoryQuery = gql`
  query introspectNewsCategoryType {
    __type(name: "NewsCategory") {
      enumValues {
        name
      }
    }
  }
`;

const topEventsQuery = gql`
  query($fetchCount: Int) {
    eventsList: eventsItems(first: $fetchCount, orderBy: startDate_DESC) {
      startDate
      endDate
      title
      image {
        url
      }
      category
      slug
      blurb
    }
  }
`;

const eventQuery = gql`
  query($slug: String!) {
    eventItem: eventsItems(where: { slug: $slug }) {
      startDate
      endDate
      title
      image {
        url
      }
      detail {
        html
      }
      blurb
      externalLink
    }
  }
`;

const eventsCategoryQuery = gql`
  query introspectEventsCategoryType {
    __type(name: "EventsCategory") {
      enumValues {
        name
      }
    }
  }
`;

const feedbackReasonQuery = gql`
  query introspectFeedbackReasonType {
    __type(name: "FeedbackReason") {
      enumValues {
        name
      }
    }
  }
`;

const contactReasonQuery = gql`
  query introspectContactReasonType {
    __type(name: "ContactReason") {
      enumValues {
        name
      }
    }
  }
`;

const contactAreaQuery = gql`
  query introspectContactAreaType {
    __type(name: "ContactArea") {
      enumValues {
        name
      }
    }
  }
`;

module.exports = {
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
};
