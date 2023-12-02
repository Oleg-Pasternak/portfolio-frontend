import { gql } from '@apollo/client';

export const GET_INITIAL_DATA = gql`
  query($site: String) {
    settings (site: $site) {
      pageIcon
      footerText
      contactEmail
      githubLink
      linkedinLink
    }
  landing (site: $site) {
      title
      color1
      color2
      pageDescription
      content {
        __typename
        ...ProjectsBlock
        ...StackBlock
      }
    }
  }

  fragment ProjectsBlock on ProjectsBlock {
    projects {
      page {
        title
      }
      previewImage {
        rendition(format: "webp") {
          url
        }
      }
      employer {
        title
        link
      }
    }
  }

  fragment StackBlock on StackBlock {
    leftSide {
      title
      content {
        ...IconsList
        ...DescriptionBlock
      }
    }
    rightSide {
      title
      content {
        ...IconsList
        ...DescriptionBlock
      }
    }
  }

  fragment IconsList on IconsList {
    icons {
      rendition(format: "webp") {
        url
      }
    }
  }

  fragment DescriptionBlock on DescriptionBlock {
    text
  }
`;
