import Header from 'src/components/Header';
import Head from 'src/components/Head';
import Boiler  from 'src/components/_Boiler'
import Hero from 'src/components/Hero'
import Footer from 'src/components/Footer'
import { GET_INITIAL_DATA } from 'src/graphql/project.jsx';
import client from 'src/utils/apollo_client';
import { GetServerSidePropsContext } from 'next';
import { WebsiteSettings, Project } from "src/constants/interfaces";

interface QueryData {
  settings: WebsiteSettings;
  project: Project;
}

export default function Project(props: { query_data: QueryData }) {
  const project: Project = props.query_data.project
  const settings: WebsiteSettings = props.query_data.settings

  console.log(props)

  return (
    <div id='main-container'>
      {project && (
        <>
          <Head page={project.seoTitle ? project.seoTitle : project.title} />
          <Header 
            logo={settings.pageIcon}
            contactEmail={settings.contactEmail}
          />
          <Hero 
            title={project.title}
            description={project.description}
            mainVideoPreview={project.mainVideoPreview}
            projectLogo={project.projectLogo}
            websiteUrl={project.websiteUrl}
          />
          <Boiler 
            pageData={project} 
          />
          <Footer 
            footerText={settings.footerText}
            githubLink={settings.githubLink}
            linkedinLink={settings.linkedinLink}
          />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const domain = context.req.headers.host
  const slug = context.query.slug

  let result = await client.query({
    query: GET_INITIAL_DATA,
    variables: {
      site: domain,
      slug: slug
    },
    fetchPolicy: 'no-cache',
  });
  return {
    props: {
      query_data: result.data,
    },
  };
}
