import { gql } from 'graphql-request';
import cms from './cms/cms.json'

async function content(graphcms, name) {
  if (graphcms === null) {
    return cms.content[name].data
  }
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
  if (graphcms === null) {
    return cms.multiContent[name].data
  }
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
  if (graphcms === null) {
    return cms.projectInformation[name].data
  }
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
  if (graphcms === null) {
    return cms.banner[name].data
  }
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
  if (graphcms === null) {
    return cms.topNews.data
  }
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
        image{url}
        category
        blurb
        slug
      }
    }
  ` 
  return await graphcms.request(query, variables);
}

async function news(graphcms,slug) {
  if (graphcms === null) {
    return cms.news[slug].data
  }
  const variables = {
    "slug":slug
  }
  const query = gql`
  query ($slug:String!) {
    newsItem: newsItems(where: {slug:$slug})
    {
      publishedDate
      title
      image{url}
      blurb
      detail{html}
    }
  } 
  ` 
  return await graphcms.request(query, variables);   
}

async function newsCategory(graphcms) {
  if (graphcms === null) {
    return cms.newsCategory.data
  }
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
  if (graphcms === null) {
    return cms.topEvents.data
  }
  const variables = {
    "fetchCount": fetchCount,
  }
  const query = gql`
    query ($fetchCount: Int) {
      eventsList:  eventsItems(
        first: $fetchCount 
        orderBy: startDate_DESC
      ) 
      {
        startDate
        endDate
        title
        image{url}
        category
        slug
        blurb
      }
    }    
  ` 
  return await graphcms.request(query, variables);
}

async function event(graphcms,slug) {
  if (graphcms === null) {
    return cms.event[slug].data
  }
  const variables = {
    "slug":slug
  }
  const query = gql`
  query ($slug:String!) {
    eventItem: eventsItems(where: {slug:$slug})
    {
      startDate
      endDate
      title
      image{url}
      detail{html}
      blurb
      externalLink
    }
  } 
  ` 
  return await graphcms.request(query, variables);   
}

async function eventsCategory(graphcms) {
  if (graphcms === null) {
    return cms.eventsCategory.data
  }
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
  if (graphcms === null) {
    return cms.feedbackReason.data
  }
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


async function contactReason(graphcms) {
  if (graphcms === null) {
    return cms.contactReason.data
  }
  const query = gql`
    query introspectContactReasonType {
      __type(name: "ContactReason") {
        enumValues {
          name
        }
      }
    }
  `
  return await graphcms.request(query);
}


async function contactArea(graphcms) {
  if (graphcms === null) {
    return cms.contactArea.data
  }
  const query = gql`
    query introspectContactAreaType {
      __type(name: "ContactArea") {
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
  news,
  newsCategory,
  topEvents,
  event,
  eventsCategory,
  banner,
  feedbackReason,
  contactReason,
  contactArea
}
