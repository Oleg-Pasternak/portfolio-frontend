import Header from 'src/components/Header';
import Head from 'src/components/Head';
import Boiler  from 'src/components/_Boiler'
import Hero from 'src/components/Hero'
import Footer from 'src/components/Footer'
import { GET_INITIAL_DATA } from 'src/graphql/index.jsx';
import client from 'src/utils/apollo_client';
import { GetServerSidePropsContext } from 'next';
import { WebsiteSettings, Landing } from "src/constants/interfaces";
import { useEffect } from 'react';

interface QueryData {
  settings: WebsiteSettings;
  landing: Landing;
}


export default function Home(props: { query_data: QueryData }) {
  const settings: WebsiteSettings = props.query_data.settings
  const landing: Landing = props.query_data.landing
  let darkMode = false

  console.log(props)

  if (landing) {
    darkMode = landing.darkMode
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div 
      id='main-container' 
    >
      {landing && (
        <>
          <Head 
            page={landing.seoTitle ? landing.seoTitle : landing.title} 
            pageIcon={settings.pageIcon}
          />
          <Header 
            logo={settings.pageIcon}
            contactEmail={settings.contactEmail}
          />
          <Hero 
            title={landing.title}
            description={landing.pageDescription}
            color1={landing.color1}
            color2={landing.color2}
            darkMode={darkMode}
            advancedHero={landing.advancedHero}
          />
          <Boiler 
            pageData={landing} 
            color1={landing.color1}
            color2={landing.color2}
            darkMode={darkMode}
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

  let result = await client.query({
    query: GET_INITIAL_DATA,
    variables: {
      site: domain
    },
    fetchPolicy: 'no-cache',
  });
  return {
    props: {
      query_data: result.data,
    },
  };
}
