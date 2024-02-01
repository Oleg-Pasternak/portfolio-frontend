import React from 'react';
import { ProjectPreview } from "src/components/ui/ProjectPreview"
import { Col } from 'react-grid-system';
import { ProjectItem } from "src/constants/interfaces";

interface ProjectsBlockProps {
  projects: ProjectItem[];
  color1?: string;
  color2?: string;
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ projects, color1, color2 }) => {
  
  return (
    <div className='projects' id='projects'>
        {projects.map((project, index) => {
            return (
                <Col md={6} className='projects-padding' key={index}>
                    <ProjectPreview {...project} />
                </Col>
            )
        })}
    </div>
  )
}

export default ProjectsBlock;