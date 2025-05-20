import Link from "next/link";
import React, { ReactElement } from "react";
import { ProjectItem } from "src/constants/interfaces";

export function ProjectPreview(props: ProjectItem): ReactElement {
  return (
    <div className="project-preview">
      <Link
        href={`/project/${props.page.slug}`}
        as={`/project/${props.page.slug}`}
      >
        <img src={props.previewImage.rendition.url} alt="Project Image" />
      </Link>
      <div className="project-preview-description">
        <Link
          href={`/project/${props.page.slug}`}
          as={`/project/${props.page.slug}`}
        >
          <p>{props.page.title}</p>
        </Link>
        {/* <span>{props.employer.title}</span> */}
      </div>
    </div>
  );
}
