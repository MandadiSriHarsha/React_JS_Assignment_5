import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import HeaderComponent from '../HeaderComponent'

import ProfileComponent from '../ProfileComponent'

import EmploymentFilterComponent from '../EmploymentFilterComponent'

import SalaryFilterComponent from '../SalaryFilterComponent'

import FetchedJobCard from '../FetchedJobCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobApiConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    defaultSearchValue: '',
    defaultSelectedEmploymentType: [],
    defaultSelectedSalaryRange: '',
    jobsListFetchStatus: jobApiConstants.isLoading,
    jobsArray: [],
  }

  componentDidMount() {
    this.fetchJobsList()
  }

  fetchJobsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {
      defaultSearchValue,
      defaultSelectedEmploymentType,
      defaultSelectedSalaryRange,
    } = this.state
    const employmentParameters = defaultSelectedEmploymentType.join()
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentParameters}&minimum_package=${defaultSelectedSalaryRange}&search=${defaultSearchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachitem => ({
        companyLogoUrl: eachitem.company_logo_url,
        employmentType: eachitem.employment_type,
        id: eachitem.id,
        jobDescription: eachitem.job_description,
        location: eachitem.location,
        packagePerAnnum: eachitem.package_per_annum,
        rating: eachitem.rating,
        title: eachitem.title,
      }))
      this.setState({
        jobsArray: updatedData,
        jobsListFetchStatus: jobApiConstants.isSuccess,
      })
    } else {
      this.setState({jobsListFetchStatus: jobApiConstants.isFailure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({defaultSearchValue: event.target.value})
  }

  startSearchFetch = event => {
    if (event.key === 'Enter') {
      this.fetchJobsList()
    }
  }

  onChangeEmploymentType = employmentId => {
    const {defaultSelectedEmploymentType} = this.state
    if (defaultSelectedEmploymentType.includes(employmentId)) {
      const newEmploymentTypesList = defaultSelectedEmploymentType.filter(
        eachType => eachType !== employmentId,
      )
      this.setState(
        {defaultSelectedEmploymentType: newEmploymentTypesList},
        this.fetchJobsList,
      )
    } else {
      defaultSelectedEmploymentType.push(employmentId)
      this.setState(
        {
          defaultSelectedEmploymentType,
        },
        this.fetchJobsList,
      )
    }
  }

  onChangeSalaryRange = salaryId => {
    this.setState({defaultSelectedSalaryRange: salaryId}, this.fetchJobsList)
  }

  jobsListLoadingCard = () => (
    <div className="jobs-list-loader-bg-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={60} width={60} />
    </div>
  )

  jobsListFailureCard = () => (
    <div className="jobs-failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jobs-failure-retry-button"
        type="button"
        onClick={this.fetchJobsList}
      >
        Retry
      </button>
    </div>
  )

  getNoJobsList = () => (
    <div className="no-jobs-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  getAvailableJobsList = () => {
    const {jobsArray} = this.state
    return (
      <ul className="fetched-jobs-list-bg-container">
        {jobsArray.map(eachitem => (
          <FetchedJobCard key={eachitem.id} jobData={eachitem} />
        ))}
      </ul>
    )
  }

  jobsListSuccessCard = () => {
    const {jobsArray} = this.state
    const length = jobsArray.length === 0
    switch (length) {
      case true:
        return this.getNoJobsList()
      case false:
        return this.getAvailableJobsList()
      default:
        return null
    }
  }

  getJobsCard = () => {
    const {jobsListFetchStatus} = this.state
    switch (jobsListFetchStatus) {
      case jobApiConstants.isLoading:
        return this.jobsListLoadingCard()
      case jobApiConstants.isSuccess:
        return this.jobsListSuccessCard()
      case jobApiConstants.isFailure:
        return this.jobsListFailureCard()
      default:
        return null
    }
  }

  render() {
    const {defaultSearchValue} = this.state
    return (
      <>
        <HeaderComponent />
        <div className="jobs-route-bg-container">
          <div className="profile-card">
            <div className="input-container mobile-input-container">
              <input
                type="search"
                placeholder="Search"
                value={defaultSearchValue}
                className="search-input"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.startSearchFetch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.fetchJobsList}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileComponent />
            <hr />
            <div className="employment-filter-group-bg-container">
              <h1 className="employment-filter-group-heading">
                Type of Employment
              </h1>
              <ul className="employment-filters-list">
                {employmentTypesList.map(eachitem => (
                  <EmploymentFilterComponent
                    key={eachitem.employmentTypeId}
                    data={eachitem}
                    onChangeEmploymentType={this.onChangeEmploymentType}
                    onKeyDown={this.startSearchFetch}
                  />
                ))}
              </ul>
            </div>
            <hr />
            <div className="salary-filter-group-bg-container">
              <h1 className="employment-filter-group-heading salary-filter-group-heading">
                Salary Range
              </h1>
              <ul className="salary-filters-list">
                {salaryRangesList.map(eachitem => (
                  <SalaryFilterComponent
                    key={eachitem.salaryRangeId}
                    data={eachitem}
                    onChangeSalaryRange={this.onChangeSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="fetched-jobs-bg-container">
            <div className="input-container desktop-input-container">
              <input
                type="search"
                placeholder="Search"
                value={defaultSearchValue}
                className="search-input"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.startSearchFetch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.fetchJobsList}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.getJobsCard()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
