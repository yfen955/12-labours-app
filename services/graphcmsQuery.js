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
          button
        }
      }
    `
    return await graphcms.request(query2,  variables);
}

async function partnerShips(graphcms, name) {
  const variables = {
    "name": name
  }

    const query3 = gql`
      query ($name: String!) {
        values: multiContent(where: {name: $name}) {
          contents {
            html
          }
          title
        }
      }
    `
    return await graphcms.request(query3,  variables);
}

async function portalHelp(graphcms, name) {
  const variables = {
    "name": name
  }

    const query4 = gql`
      query ($name: String!) {
        values: multiContent(where: {name: $name}) {
          contents {
            html
          }
          title
        }
      }
    `
    return await graphcms.request(query4,  variables);
}

export default {
  content,
  multiContent,
  projectInformation,
  partnerShips,
  portalHelp
}
