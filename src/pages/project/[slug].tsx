import Header from "src/components/Header";
import Head from "src/components/Head";
import Boiler from "src/components/_Boiler";
import Hero from "src/components/Hero";
import Footer from "src/components/Footer";
import { GET_INITIAL_DATA } from "src/graphql/project.jsx";
import client from "src/utils/apollo_client";
import type { WebsiteSettings, Project } from "src/constants/interfaces";
import { WideImage } from "src/components/ui/WideImage";
import { GetStaticPropsContext, GetStaticPathsResult } from "next";
import fs from "fs";
import path from "path";
import { useRef, useEffect } from "react";
import { useRevealer } from "src/hooks/useRevealer";
import gsap from "gsap";

interface QueryData {
  settings: WebsiteSettings;
  project: Project;
}

export default function Project(props: { query_data: QueryData }) {
  const project: Project = props.query_data.project;
  const settings: WebsiteSettings = props.query_data.settings;
  const pageRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const { reveal } = useRevealer();

  useEffect(() => {
    // Page entrance animation
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.inOut" }
      );
    }
  }, []);

  // useEffect(() => {
  //   if (revealRef.current) {
  //     reveal(revealRef.current);
  //   }
  // }, []);

  return (
    <div className="main-container" ref={pageRef} style={{ opacity: 0 }}>
      {project && (
        <>
          {/* <div
            ref={revealRef}
            className="reveal"
            style={{ backgroundColor: "#f5f5f5" }}
          /> */}
          <Head page={project.seoTitle ? project.seoTitle : project.title} />
          <Header
            logo={settings.pageIcon}
            contactEmail={settings.contactEmail}
          />
          <Hero
            title={project.title}
            description={project.description}
            projectLogo={project.projectLogo}
            websiteUrl={project.websiteUrl}
            iosUrl={project.iosUrl}
          />
          <WideImage
            image={project.mainVideoPreview}
            maxHeight="initial"
            padding="0 200px"
            disableParallax
          />
          <Boiler pageData={project} />
          <Footer
            footerText={settings.footerText}
            githubLink={settings.githubLink}
            linkedinLink={settings.linkedinLink}
          />
        </>
      )}
    </div>
  );
}

const DATA_FOLDER = path.join(process.cwd(), "src/graph_data");

export async function getStaticProps(context: GetStaticPropsContext) {
  const domain = "pasternak.work:80";
  const slug = context.params?.slug;
  const slugFolder = path.join(DATA_FOLDER, "pasternak-work");
  const filePath = path.join(slugFolder, `${slug}.json`);

  // Ensure the slug folder exists
  if (!fs.existsSync(slugFolder)) {
    fs.mkdirSync(slugFolder, { recursive: true });
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
          slug: slug,
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
            project: {
              title: 'Project Not Found',
              description: 'This project could not be loaded.',
            },
          },
        },
      };
    }
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const paths = [
    { params: { slug: "thebritely" } },
    { params: { slug: "qlevents" } },
    { params: { slug: "aqrm" } },
    { params: { slug: "monomono" } },
    { params: { slug: "living2022" } },
    { params: { slug: "zivjulete" } },
  ];

  return {
    paths,
    fallback: false,
  };
}
