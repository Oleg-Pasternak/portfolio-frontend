import React, { ReactElement } from 'react';
import { Rendition } from 'src/types';
interface ProjectPreviewProps {
  previewImage: {
    rendition: Rendition;
  };
  page: {
    title: string;
  };
  employer: {
    title: string;
  };
}

export function ProjectPreview(props: ProjectPreviewProps): ReactElement {
  return (
    <div className='project-preview'>
      <img src={props.previewImage.rendition.url} alt="Project Image" />
      <div className="project-preview-description">
        <p>{props.page.title}</p>
        <span>{props.employer.title}</span>
      </div>
    </div>
  );
}
