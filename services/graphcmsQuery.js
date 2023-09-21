import cms_content from "./cms/cms_content.json";
import {
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
} from "./cms/cms_query.js";

async function content(graphcms, name) {
  if (!graphcms) {
    return cms_content.content[name];
  }
  const variables = {
    name: name,
  };
  return await graphcms.request(contentQuery, variables);
}

async function multiContent(graphcms, name) {
  if (!graphcms) {
    return cms_content.multiContent[name];
  }
  const variables = {
    name: name,
  };
  return await graphcms.request(multiContentQuery, variables);
}

async function projectInformation(graphcms, name) {
  if (!graphcms) {
    return cms_content.projectInformation[name];
  }
  const variables = {
    name: name,
  };
  return await graphcms.request(projectInformationQuery, variables);
}

async function banner(graphcms, name) {
  if (!graphcms) {
    return cms_content.banner[name];
  }
  const variables = {
    name: name,
  };
  return await graphcms.request(bannerQuery, variables);
}

async function topNews(graphcms, fetchCount) {
  if (!graphcms) {
    return cms_content.topNews;
  }
  const variables = {
    fetchCount: fetchCount,
  };
  return await graphcms.request(topNewsQuery, variables);
}

async function news(graphcms, slug) {
  if (!graphcms) {
    return cms_content.news[slug];
  }
  const variables = {
    slug: slug,
  };
  return await graphcms.request(newsQuery, variables);
}

async function newsCategory(graphcms) {
  if (!graphcms) {
    return cms_content.newsCategory;
  }
  return await graphcms.request(newsCategoryQuery);
}

async function topEvents(graphcms, fetchCount) {
  if (!graphcms) {
    return cms_content.topEvents;
  }
  const variables = {
    fetchCount: fetchCount,
  };
  return await graphcms.request(topEventsQuery, variables);
}

async function event(graphcms, slug) {
  if (!graphcms) {
    return cms_content.event[slug];
  }
  const variables = {
    slug: slug,
  };
  return await graphcms.request(eventQuery, variables);
}

async function eventsCategory(graphcms) {
  if (!graphcms) {
    return cms_content.eventsCategory;
  }
  return await graphcms.request(eventsCategoryQuery);
}

async function feedbackReason(graphcms) {
  if (!graphcms) {
    return cms_content.feedbackReason;
  }
  return await graphcms.request(feedbackReasonQuery);
}

async function contactReason(graphcms) {
  if (!graphcms) {
    return cms_content.contactReason;
  }
  return await graphcms.request(contactReasonQuery);
}

async function contactArea(graphcms) {
  if (!graphcms) {
    return cms_content.contactArea;
  }
  return await graphcms.request(contactAreaQuery);
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
  contactArea,
};
