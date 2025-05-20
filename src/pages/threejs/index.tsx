import Header from "src/components/Header";
import Head from "src/components/Head";
import Hero from "src/components/Hero";
import Boiler from "src/components/_Boiler";
import ServicesBlock from "src/components/ServicesBlock";
import { GET_INITIAL_DATA } from "src/graphql/index.jsx";
import client from "src/utils/apollo_client";
import { WebsiteSettings, Landing } from "src/constants/interfaces";
import { useEffect } from "react";
import fs from "fs";
import path from "path";
import { GetStaticPropsContext } from "next";
import MobiusStrip from "src/components/MobiusStrip";

interface QueryData {
  settings: WebsiteSettings;
  landing: Landing;
}

export default function Home(props: { query_data: QueryData }) {
  const settings: WebsiteSettings = props.query_data.settings;
  const landing: Landing = props.query_data.landing;
  let darkMode = landing.darkMode;

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className="main-container">
      {landing && (
        <>
          <Head
            page={landing.seoTitle ? landing.seoTitle : landing.title}
            pageIcon={settings.favicon}
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
          <MobiusStrip />
        </>
      )}
    </div>
  );
}

const DATA_FOLDER = path.join(process.cwd(), "src/graph_data");

export async function getStaticProps(context: GetStaticPropsContext) {
  const domain = "pasternak.work:80";
  const filePath = path.join(DATA_FOLDER, `pasternak-work.json`);

  // Ensure the data folder exists
  if (!fs.existsSync(DATA_FOLDER)) {
    fs.mkdirSync(DATA_FOLDER);
  }

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const query_data = JSON.parse(fileData);
    return {
      props: {
        query_data,
      },
    };
  } else {
    // Query the API
    let result = await client.query({
      query: GET_INITIAL_DATA,
      variables: {
        site: domain,
      },
      fetchPolicy: "no-cache",
    });

    // Save the result to the file
    fs.writeFileSync(filePath, JSON.stringify(result.data));

    return {
      props: {
        query_data: result.data,
      },
    };
  }
}
