import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import ProjectCard from '../ProjectCard'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesList: props.categoriesList,
      activeCategory: 'ALL', // Set a default category, assuming 'ALL' is a valid category
      projectsList: [],
      isLoading: true,
      isFailed: false,
    }
  }

  componentDidMount() {
    this.getProjectsList()
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the activeCategory has changed
    const {activeCategory} = this.state
    if (prevState.activeCategory !== activeCategory) {
      this.getProjectsList()
    }
  }

  onChangeCategory = event => {
    this.setState({
      activeCategory: event.target.value,
    })
  }

  getProjectsList = async () => {
    try {
      const {activeCategory} = this.state
      const response = await fetch(
        `https://apis.ccbp.in/ps/projects?category=${activeCategory}`,
        // 'https://apis.ccbp.in/ps/projects?category=ALLL',
      )
      const data = await response.json()
      const formattedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        projectsList: formattedData,
        isLoading: false,
      })
      // console.log(formattedData)
    } catch (error) {
      this.setState({
        isFailed: true,
        isLoading: false,
      })
    }
  }

  onClickRetry = () => {
    this.getProjectsList()
  }

  render() {
    const {
      categoriesList,
      activeCategory,
      projectsList,
      isLoading,
      isFailed,
    } = this.state
    // console.log(activeCategory)
    // console.log(projectsList)
    return (
      <div className="bg-container">
        <Header />
        <div className="drop-down-container">
          <select
            className="drop-down-list"
            onChange={this.onChangeCategory}
            value={activeCategory}
          >
            {categoriesList.map(eachItem => (
              <option
                key={eachItem.id}
                value={eachItem.id}
                className="drop-down-option"
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
        </div>
        <ul className="project-cards-container">
          {isLoading && (
            <div data-testid="loader" className="loader-container">
              <Loader
                data-testid="loader"
                type="TailSpin"
                color="#00BFFF"
                height={50}
                width={50}
              />
            </div>
          )}
          {isFailed ? (
            <div className="failed-container">
              <p>We cannot seem to find the page you are looking for</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
                className="failed-image"
              />
              <h1> Oops! Something Went Wrong </h1>
              <button type="button" onClick={this.onClickRetry}>
                {' '}
                Retry{' '}
              </button>
            </div>
          ) : (
            projectsList.map(eachItem => (
              <ProjectCard projectDetails={eachItem} key={eachItem.id} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default Home
