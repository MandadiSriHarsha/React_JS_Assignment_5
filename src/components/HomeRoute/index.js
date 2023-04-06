import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../HeaderComponent'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class HomeRoute extends Component {
  state = {isLoaderLoading: true}

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoaderLoading: false})
    }, 1000)
  }

  renderHomePageCard = () => (
    <div className="home-page-bg-container">
      <h1 className="home-page-route-heading">
        Find The Job That Fits Your Life
      </h1>
      <p className="home-page-route-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="find-jobs-link-item" to="/jobs">
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  )

  renderLoaderCard = () => (
    <div className="loader-bg-container">
      <Loader type="ThreeDots" color="#ffffff" height={60} width={60} />
    </div>
  )

  render() {
    const {isLoaderLoading} = this.state
    return (
      <>
        <Header />
        {isLoaderLoading ? this.renderLoaderCard() : this.renderHomePageCard()}
      </>
    )
  }
}

export default HomeRoute
