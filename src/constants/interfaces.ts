export interface WebsiteSettings {
    __typename: string;
    contactEmail: string;
    footerText: string;
    githubLink: string;
    linkedinLink: string;
    pageIcon: {
      rendition: Rendition;
    };
}

export interface Landing {
    __typename: string;
    color1: string;
    color2: string;
    content: object[];
    pageDescription: string;
    seoTitle: string;
    title: string;
}

export interface ProjectItem {
    __typename: string;
    employer: {
      __typename: string;
      link: string;
      title: string;
    };
    link: string;
    title: string;
    page: {
      __typename: string;
      title: string;
      slug: string;
    };
    previewImage: {
      __typename: string;
      rendition: {
        url: string;
        __typename: string;
      };
    };
  }
  
  export interface StackBlockProps {
    leftSide: {
      title: string;
      content: {
        text: string;
        icons: {
          rendition: Rendition;
        }[];
      }[];
    };
    rightSide: {
      title: string;
      content: {
        text: string;
        icons: {
          rendition: Rendition;
        }[];
      }[];
    };
  }

  export interface Rendition {
    url: string;
    __typename: string;
  }