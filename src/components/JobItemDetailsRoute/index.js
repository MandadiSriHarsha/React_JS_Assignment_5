import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import HeaderComponent from '../HeaderComponent'

import JobItemDetailsComponent from '../JobItemDetailsComponent'

import SimilarJobComponent from '../SimilarJobComponent'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const jobDetailsApiConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class JobItemDetailsRoute extends Component {
  state = {
    jobDetails: {},
    similarJobsList: [],
    fetchStatus: jobDetailsApiConstants.isLoading,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getUpdatedJobDetails = jobDetails => {
    const updatedData = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }
    const updatedSkills = jobDetails.skills.map(eachitem => ({
      imageUrl: eachitem.image_url,
      name: eachitem.name,
    }))
    updatedData.skills = updatedSkills
    const updatedLifeAtCompany = {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    }
    updatedData.lifeAtCompany = updatedLifeAtCompany
    return updatedData
  }

  getUpdatedSimilarJobsList = similarJobs => {
    const updatedSimilarJobs = similarJobs.map(eachitem => ({
      companyLogoUrl: eachitem.company_logo_url,
      employmentType: eachitem.employment_type,
      id: eachitem.id,
      jobDescription: eachitem.job_description,
      location: eachitem.location,
      rating: eachitem.rating,
      title: eachitem.title,
    }))
    return updatedSimilarJobs
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = this.getUpdatedJobDetails(data.job_details)
      const updatedSimilarJobsList = this.getUpdatedSimilarJobsList(
        data.similar_jobs,
      )
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobsList: updatedSimilarJobsList,
        fetchStatus: jobDetailsApiConstants.isSuccess,
      })
    } else {
      this.setState({fetchStatus: jobDetailsApiConstants.isFailure})
    }
  }

  renderJobDetailsLoaderComponent = () => (
    <div className="loader-bg-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={60} width={60} />
    </div>
  )

  renderJobDetailsFailureComponent = () => (
    <div className="job-details-failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsSuccessComponent = () => {
    const {jobDetails, similarJobsList} = this.state
    return (
      <div className="job-item-details-bg-container">
        <JobItemDetailsComponent jobDetails={jobDetails} />
        <div className="similar-jobs-bg-container">
          <h1 className="similar-jobs-main-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobsList.map(eachitem => (
              <SimilarJobComponent key={eachitem.id} jobData={eachitem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getJobDetailsComponents = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case jobDetailsApiConstants.isLoading:
        return this.renderJobDetailsLoaderComponent()
      case jobDetailsApiConstants.isSuccess:
        return this.renderJobItemDetailsSuccessComponent()
      case jobDetailsApiConstants.isFailure:
        return this.renderJobDetailsFailureComponent()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderComponent />
        {this.getJobDetailsComponents()}
      </>
    )
  }
}

export default JobItemDetailsRoute
