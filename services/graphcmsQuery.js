import { gql } from 'graphql-request';

async function content(graphcms, name) {
  const variables = {
    "name": name
  }

  const query = gql`
    query ($name: String!) {
      values: titledContent(where: {name: $name}) {
        content {
          html
        }
        title
      }
    }
  ` 
  return await graphcms.request(query,  variables);
}


async function multiContent(graphcms, name) {
  const variables = {
    "name": name
  }

    const query1 = gql`
      query ($name: String!) {
        values: multiContent(where: {name: $name}) {
          contents {
            html
          }
          title
        }
      }
    `
    return await graphcms.request(query1,  variables);
}

async function projectInformation(graphcms, name) {
  const variables = {
    "name": name
  }

    const query2 = gql`
      query ($name: String!) {
        values: projectInformation(where: {name: $name}) {
          content {
            html
          }
          title,
          linkCaption,
          link
        }
      }
    `
    return await graphcms.request(query2,  variables);
}

async function banner(graphcms, name) {
  const variables = {
    "name": name
  }
  const query = gql`
    query ($name: String!) {
      values: bannerImage(where: {name: $name}) {
        image {
          url
        }
        title
      }
    }
  `
  return await graphcms.request(query, variables);
}


async function topNews(graphcms, fetchCount) {
  const variables = {
    "fetchCount":  fetchCount
  }
  const query = gql`
    query ($fetchCount: Int) {
      newsList:  newsItems(
        first: $fetchCount
        orderBy: publishedDate_DESC
      ) 
      {
        publishedDate
        title
        image{
          url
        }
        category
        blurb
        slug
        detail{
          html
        }
      }
    }
  ` 
  return await graphcms.request(query, variables);
}

async function newsCategory(graphcms) {

  const query = gql`
    query introspectNewsCategoryType {
      __type(name: "NewsCategory") {
        enumValues {
          name
        }
      }
    }
  `
  return await graphcms.request(query);
}


async function topEvents(graphcms, fetchCount) {
  const variables = {
    "fetchCount": fetchCount,
  }
  const query = gql`
    query ($fetchCount: Int) {
      eventsList:  eventsItems(
        orderBy: startDate_DESC
        first: $fetchCount
      ) 
      {
        startDate
        endDate
        title
        image{
          url
        }
        category
        slug
        detail{
          html
        }
        blurb
        externalLink
      }
    }
  ` 
  return await graphcms.request(query, variables);
}


async function eventsCategory(graphcms) {

  const query = gql`
    query introspectEventsCategoryType {
      __type(name: "EventsCategory") {
        enumValues {
          name
        }
      }
    }
  `
  return await graphcms.request(query);
}

async function feedbackReason(graphcms) {

  const query = gql`
    query introspectFeedbackReasonType {
      __type(name: "FeedbackReason") {
        enumValues {
          name
        }
      }
    }
  `
  return await graphcms.request(query);
}

export default {
  content,
  multiContent,
  projectInformation,
  topNews,
  newsCategory,
  topEvents,
  eventsCategory,
  banner,
  feedbackReason
}
