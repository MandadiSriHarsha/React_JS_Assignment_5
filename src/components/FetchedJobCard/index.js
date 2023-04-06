import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const FetchedJobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <li className="fetched-job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-logo-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-heading-card">
            <h1 className="job-name">{title}</h1>
            <div className="company-rating-card">
              <AiFillStar id="rating" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="company-extra-details-card">
          <div className="company-location-employment-card">
            <div className="company-location-card">
              <MdLocationOn className="location" />
              <p className="company-location">{location}</p>
            </div>
            <div className="company-employment-type-card">
              <BsBriefcaseFill className="employment" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <div className="company-salary-card">
            <p className="company-salary">{packagePerAnnum}</p>
          </div>
        </div>
        <div className="hr-container">
          <hr className="separator" />
        </div>
        <div className="company-description-card">
          <h1 className="description-heading">Description</h1>
          <p className="company-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default FetchedJobCard
