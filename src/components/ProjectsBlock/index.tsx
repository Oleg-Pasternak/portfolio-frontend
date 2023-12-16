import React from 'react';
import { ProjectPreview } from "src/components/ui/ProjectPreview"
import { Col } from 'react-grid-system';
import { ProjectItem } from "src/constants/interfaces";

interface ProjectsBlockProps {
  projects: ProjectItem[];
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ projects }) => {
  
  return (
    <div className='projects'>
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