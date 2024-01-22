import './index.css'

const ProjectCard = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <li className="each-project-card">
      <img src={imageUrl} alt={name} className="project-image" />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectCard
