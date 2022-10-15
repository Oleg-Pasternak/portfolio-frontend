import styles from './styles.module.scss';

export default function ProjectPreview(props) {
  return (
    <div className={`${styles.projectPreview} projects project-${props.id + 1}`} key={props.id}>
      <p>{props.data.title}</p>
      <img className='img' src={props.data.imageURI} alt="" />
    </div>
  )
}
