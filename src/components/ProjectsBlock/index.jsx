import { ProjectPreview } from "src/components/ui/ProjectPreview"
import { Container, Row, Col } from 'react-grid-system';

export function ProjectsBlock(props) {

  const projects = props.projects
  
  return (
    <div className='projects'>
        {projects.map((project, index) => {
            return (
                <Col md={6} className='projects-padding'>
                    <ProjectPreview {...project} key={index} />
                </Col>
            )
        })}
    </div>
  )
}
