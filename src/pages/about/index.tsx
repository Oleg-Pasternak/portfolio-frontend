import React from "react";
import Head from "next/head";
import AsciiDonut from "src/components/AsciiDonut";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import { GET_INITIAL_DATA } from "src/graphql/index";
import client from "src/utils/apollo_client";
import { WebsiteSettings, Landing } from "src/constants/interfaces";
import fs from "fs";
import path from "path";
import { GetStaticPropsContext } from "next";

interface QueryData {
	settings: WebsiteSettings;
	landing: Landing;
}

const About = (props: { query_data: QueryData }) => {
	const settings: WebsiteSettings = props.query_data.settings;
	const landing: Landing = props.query_data.landing;

	return (
		<div className="about-page">
			<Head>
				<title>{landing.seoTitle ? landing.seoTitle : landing.title}</title>
				<link rel="icon" href={settings.favicon?.rendition?.url} />
			</Head>
			<Header logo={settings.pageIcon} contactEmail={settings.contactEmail} />
			<main>
				<div className="about-page-description">
					<div className="about-page-description__l">
						<h1>About</h1>
						<p>
							Hello! I&apos;m Oleg Pasternak.
							<br />
							Frontend developer based in Kyiv, Ukraine. I specialize in
							creating web applications that are not only functional but also
							visually appealing.
						</p>
					</div>
					<div className="about-page-description__r">
						<AsciiDonut />
					</div>
				</div>
				{/* <div className="about-page-skills">
                  <h2>Skills</h2>
                  <ul>
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>React</li>
                    <li>Next.js</li>
                    <li>GraphQL</li>
                    <li>Node.js</li>
                    <li>CSS / SCSS / Tailwind CSS</li>
                    <li>HTML5</li>
                  </ul>
                </div> */}
			</main>
			<Footer
				footerText={settings.footerText}
				githubLink={settings.githubLink}
				linkedinLink={settings.linkedinLink}
			/>
		</div>
	);
};

export default About;

const DATA_FOLDER = path.join(process.cwd(), "src/graph_data");

export async function getStaticProps() {
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
