import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobComponent = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobData

  return (
    <li className="similar-job-item">
      <div className="similar-job-item-heading-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-job-name-rating-card">
          <h1 className="similar-job-job-name">{title}</h1>
          <div className="similar-job-rating-card">
            <AiFillStar className="similar-job-rating-icon" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-job-description-card">
        <h1 className="similar-job-description-heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
      </div>
      <div className="similar-job-location-employment-type-card">
        <div className="similar-job-location-card">
          <MdLocationOn className="similar-job-location-icon" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-employment-type-card">
          <BsBriefcaseFill className="similar-job-employment-icon" />
          <p className="similar-job-employment">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobComponent
