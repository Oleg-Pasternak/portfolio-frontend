
export function ProjectPreview(props) {
  console.log(props)
  return (
    <div className='project-preview'>
      <img src={props.previewImage.rendition.url} alt="Project Image" />
      <div className="project-preview-description">
        <p>{props.page.title}</p>
        <span>{props.employer.title}</span>
      </div>
    </div>
  )
}
