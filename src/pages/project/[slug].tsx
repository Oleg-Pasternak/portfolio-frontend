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

interface QueryData {
  settings: WebsiteSettings;
  project: Project;
}

export default function Project(props: { query_data: QueryData }) {
  const project: Project = props.query_data.project;
  const settings: WebsiteSettings = props.query_data.settings;

  return (
    <div className="main-container">
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
