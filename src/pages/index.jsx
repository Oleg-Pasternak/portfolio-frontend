import Header from 'src/components/Header';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';
import { Boiler } from 'src/components/_Boiler'
import Hero from 'src/components/Hero'
import Footer from 'src/components/Footer'
import { GET_INITIAL_DATA } from 'src/graphql/index.jsx';
import client from 'src/utils/apollo_client';
import axios from 'axios'

export default function Home(props) {

  const settings = props.query_data.settings
  const landing = props.query_data.landing

  console.log(settings, landing)

  return (
    <div id='main-container'>
      <Head page="Main Page" />
      <Header 
        logo={settings.pageIcon}
        contactEmail={settings.contactEmail}
      />
      <Hero 
        title={landing.title}
        description={landing.pageDescription}
        color1={landing.color1}
        color2={landing.color2}
      />
      <Boiler 
        pageData={landing} 
        color1={landing.color1}
        color2={landing.color2}
      />
      <Footer 
        footerText={settings.footerText}
        githubLink={settings.githubLink}
        linkedinLink={settings.linkedinLink}
      />
    </div>
  )
}

export async function getServerSideProps(context) {
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
