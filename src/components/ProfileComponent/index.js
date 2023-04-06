import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const profileFetchStatusConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class ProfileComponent extends Component {
  state = {
    profileDetails: {},
    apiFetchStatus: profileFetchStatusConstants.isLoading,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiFetchStatus: profileFetchStatusConstants.isSuccess,
      })
    } else {
      this.setState({apiFetchStatus: profileFetchStatusConstants.isFailure})
    }
  }

  renderProfileLoaderComponent = () => (
    <div className="loader-bg-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={60} width={60} />
    </div>
  )

  reFetchUserDetails = () => {
    this.setState(
      {apiFetchStatus: profileFetchStatusConstants.isLoading},
      this.getProfileData,
    )
  }

  renderProfileSuccessComponent = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="user-profile-card">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureComponent = () => (
    <div className="user-profile-failure-card">
      <button
        type="button"
        onClick={this.reFetchUserDetails}
        className="profile-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderComponents = () => {
    const {apiFetchStatus} = this.state
    switch (apiFetchStatus) {
      case profileFetchStatusConstants.isLoading:
        return this.renderProfileLoaderComponent()
      case profileFetchStatusConstants.isSuccess:
        return this.renderProfileSuccessComponent()
      case profileFetchStatusConstants.isFailure:
        return this.renderProfileFailureComponent()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderComponents()}</>
  }
}

export default ProfileComponent
