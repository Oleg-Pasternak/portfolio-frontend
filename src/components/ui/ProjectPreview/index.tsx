import React, { ReactElement } from 'react';

interface Rendition {
  url: string;
  // Другие свойства и типы, если они есть
}

interface ProjectPreviewProps {
  previewImage: {
    rendition: Rendition;
    // Другие свойства и типы, если они есть
  };
  page: {
    title: string;
    // Другие свойства и типы, если они есть
  };
  employer: {
    title: string;
    // Другие свойства и типы, если они есть
  };
  // Другие свойства и типы, если они есть
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
