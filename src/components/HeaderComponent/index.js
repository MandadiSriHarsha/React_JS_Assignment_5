import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const HeaderComponent = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar-bg-container">
      <div className="navbar-mobile-navbar-card">
        <Link to="/" className="navbar-link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navbar-website-mobile-logo"
          />
        </Link>
        <ul className="navbar-mobile-nav-items">
          <li className="navbar-route-navbar-list-item">
            <Link to="/" className="navbar-link-item">
              <AiFillHome className="navbar-nav-icon" />
            </Link>
          </li>
          <li className="navbar-route-navbar-list-item">
            <Link to="/jobs" className="navbar-link-item">
              <BsFillBriefcaseFill className="navbar-nav-icon" />
            </Link>
          </li>
          <li className="navbar-route-navbar-list-item">
            <button
              type="button"
              className="navbar-logout-button"
              onClick={onClickLogout}
            >
              <FiLogOut className="navbar-nav-icon" />
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-desktop-card">
        <Link to="/" className="navbar-link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navbar-website-desktop-logo"
          />
        </Link>
        <ul className="navbar-desktop-nav-items">
          <li className="navbar-route-navbar-list-item">
            <Link to="/" className="navbar-link-item">
              Home
            </Link>
          </li>
          <li className="navbar-route-navbar-list-item">
            <Link to="/jobs" className="navbar-link-item">
              Jobs
            </Link>
          </li>
        </ul>
        <ul className="navbar-desktop-route-button-list">
          <li className="navbar-route-navbar-list-item">
            <button
              className="navbar-desktop-logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(HeaderComponent)
