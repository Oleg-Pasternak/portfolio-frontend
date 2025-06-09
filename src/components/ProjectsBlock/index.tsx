import React from "react";
import { ProjectPreview } from "src/components/ui/ProjectPreview";
import { ProjectItem } from "src/constants/interfaces";
import AnimatedSvg from "src/components/ui/AnimatedSvg";

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
        <AnimatedSvg
          width={120}
          height={120}
          color={color1 || "#000"}
          duration={5}
          svgUrl="/svg/badge.svg"
        />
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
          <div className="projects-item" key={index}>
            <ProjectPreview {...project} />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsBlock;
