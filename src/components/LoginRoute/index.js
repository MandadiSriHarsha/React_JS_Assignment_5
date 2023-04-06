import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isErrorOccurred: false,
    errorMessage: '',
    usernameOnChange: false,
    passwordOnChange: false,
    isLoginLoaderLoading: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoginLoaderLoading: false})
    }, 1000)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, usernameOnChange: true})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, passwordOnChange: true})
  }

  setCookies = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setCookies(data.jwt_token)
    } else {
      this.setState({isErrorOccurred: true, errorMessage: data.error_msg})
    }
  }

  renderLoginLoader = () => (
    <div className="welcome-card">
      <Loader type="TailSpin" color="#ffffff" height={60} width={60} />
    </div>
  )

  renderLoginForm = () => {
    const {
      username,
      password,
      isErrorOccurred,
      errorMessage,
      usernameOnChange,
      passwordOnChange,
    } = this.state
    const usernameClass = usernameOnChange ? 'username-class' : ''
    const passwordClass = passwordOnChange ? 'password-class' : ''
    const usernameLabelOnChangeClass = usernameOnChange
      ? 'username-label-class'
      : ''
    const passwordLabelOnChangeClass = passwordOnChange
      ? 'password-label-class'
      : ''
    return (
      <div className="login-page-bg-container" onSubmit={this.submitForm}>
        <form className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="username-container">
            <label
              className={`label ${usernameLabelOnChangeClass}`}
              htmlFor="username"
            >
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className={`login-route-input ${usernameClass}`}
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="password-container">
            <label
              className={`label ${passwordLabelOnChangeClass}`}
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className={`login-route-input ${passwordClass}`}
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isErrorOccurred && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }

  render() {
    const {isLoginLoaderLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        {isLoginLoaderLoading
          ? this.renderLoginLoader()
          : this.renderLoginForm()}
      </>
    )
  }
}

export default LoginRoute
