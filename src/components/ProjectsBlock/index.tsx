import React from "react";
import { ProjectPreview } from "src/components/ui/ProjectPreview";
import { Col } from "react-grid-system";
import { ProjectItem } from "src/constants/interfaces";

interface ProjectsBlockProps {
  projects: ProjectItem[];
  color1?: string;
  color2?: string;
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({
  projects,
  color1,
  color2,
}) => {
  return (
    <div className="projects" id="projects">
      <div className="projects-heading">
        <h2>
          Featured <br /> Work
        </h2>
        <div className="projects-heading__description">
          <p>
            Browse through my highlighted projects and works showcased below.
            <br />
            Click on each one for an overview of the brand.
          </p>
          <div className="staricon" />
        </div>
      </div>
      {projects.map((project, index) => {
        return (
          <div className="projects-item">
            <ProjectPreview {...project} />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsBlock;
