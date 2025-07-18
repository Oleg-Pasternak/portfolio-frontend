import Header from "src/components/Header";
import Head from "src/components/Head";
import Hero from "src/components/Hero";
import Boiler from "src/components/_Boiler";
import Footer from "src/components/Footer";
import { GET_INITIAL_DATA } from "src/graphql/index.jsx";
import client from "src/utils/apollo_client";
import { WebsiteSettings, Landing } from "src/constants/interfaces";
import { useEffect, useRef, useState } from "react";
import fs from "fs";
import path from "path";
import { GetStaticPropsContext } from "next";
import MobiusStrip from "src/components/MobiusStrip";
import { ScrollVideo } from "src/components/ui/ScrollVideo";
import { useRevealer } from "src/hooks/useRevealer";

interface QueryData {
  settings: WebsiteSettings;
  landing: Landing;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export default function Home(props: { query_data: QueryData }) {
  const settings: WebsiteSettings = props.query_data.settings;
  const landing: Landing = props.query_data.landing;
  let darkMode = landing.darkMode;
  const revealRef = useRef<HTMLDivElement>(null);
  const { reveal } = useRevealer();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  useEffect(() => {
    if (revealRef.current) {
      reveal(revealRef.current);
    }
  }, [reveal]);

  useEffect(() => {
    document.body.style.backgroundColor = "#050505";
    return () => {
      document.body.style.backgroundColor = "";
    };
  });

  return (
    <div className="main-container">
      {landing && (
        <>
          <div ref={revealRef} className="reveal" />
          <Head
            page={landing.seoTitle ? landing.seoTitle : landing.title}
            pageIcon={settings.favicon}
          />
          <Header
            logo={settings.pageIcon}
            contactEmail={settings.contactEmail}
            darkMode={true}
          />
          <Hero
            title={landing.title}
            description={landing.pageDescription}
            advancedHero={landing.advancedHero}
          />
          <Boiler
            pageData={landing}
          />
          <Footer
              footerText={settings.footerText}
              githubLink={settings.githubLink}
              linkedinLink={settings.linkedinLink}
              darkMode={true}
          />
          {isMobile ? <ScrollVideo src="https://pstrkstorage.s3.eu-north-1.amazonaws.com/mobius.mp4" /> : <MobiusStrip />}
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
    try {
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
    } catch (error) {
      console.error('Apollo Client error during build:', error);
      // Fallback to empty data or default values
      return {
        props: {
          query_data: {
            settings: {},
            landing: {
              title: 'Portfolio',
              pageDescription: 'Frontend Developer Portfolio',
            },
          },
        },
      };
    }
  }
}
