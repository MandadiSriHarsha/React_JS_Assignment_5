import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiExternalLink} from 'react-icons/fi'

import './index.css'

const JobItemDetailsComponent = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
    lifeAtCompany,
  } = jobDetails

  const SkillsCardRender = dataProps => {
    const {data} = dataProps
    return (
      <li className="skill-card">
        <img src={data.imageUrl} alt={data.name} className="skill-image" />
        <p className="skill-name">{data.name}</p>
      </li>
    )
  }

  return (
    <div className="job-complete-details-bg-container">
      <div className="job-details-header-card">
        <img
          src={companyLogoUrl}
          alt=" job details company logo"
          className="job-details-company-logo"
        />
        <div className="job-details-job-role-card">
          <h1 className="job-details-job-role-title">{title}</h1>
          <div className="job-details-rating-card">
            <AiFillStar className="job-details-star-icon" />
            <p className="job-details-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-details-location-employment-type-salary-card">
        <div className="extra-card">
          <div className="job-details-location-card">
            <MdLocationOn className="job-details-location-icon" />
            <p className="job-details-location">{location}</p>
          </div>
          <div className="job-details-employment-type-card">
            <BsBriefcaseFill className="job-details-employment-type-icon" />
            <p className="job-details-employment-type">{employmentType}</p>
          </div>
        </div>
        <p className="job-details-salary">{packagePerAnnum}</p>
      </div>
      <div className="job-details-separator-container">
        <hr className="job-details-separator" />
      </div>
      <div className="job-details-description-card">
        <h1 className="job-details-description">Description</h1>
        <div className="job-details-visit-card">
          <a
            href={companyWebsiteUrl}
            target="_blank"
            className="job-details-visit-link"
            rel="noreferrer"
          >
            Visit
          </a>
          <FiExternalLink className="job-details-link-icon" />
        </div>
      </div>
      <p className="job-details-main-description">{jobDescription}</p>
      <div className="job-details-skills-card">
        <h1 className="job-details-skills-card-heading">Skills</h1>
        <ul className="job-details-skills-list">
          {skills.map(eachitem => (
            <SkillsCardRender key={eachitem.name} data={eachitem} />
          ))}
        </ul>
      </div>
      <div className="life-at-company-card">
        <div className="life-at-company-content-card">
          <h1 className="life-at-company-heading">Life at Company</h1>
          <p className="life-at-company-description">
            {lifeAtCompany.description}
          </p>
        </div>
        <img
          src={lifeAtCompany.imageUrl}
          className="life-at-company-image"
          alt="life at company"
        />
      </div>
    </div>
  )
}

export default JobItemDetailsComponent
