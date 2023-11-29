
export default function ProjectPreview(props) {
  return (
    <div className='project-preview' key={props.id}>
      <p>{props.data.title}</p>
      <img className='img' src={props.data.imageURI} alt="" />
    </div>
  )
}
