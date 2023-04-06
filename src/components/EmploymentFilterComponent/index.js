import './index.css'

const EmploymentFilterComponent = props => {
  const {onChangeEmploymentType, data} = props
  const {label, employmentTypeId} = data
  const changeEmploymentId = () => {
    onChangeEmploymentType(employmentTypeId)
  }
  return (
    <li className="employment-list-item">
      <button className="employment-item-container" type="button">
        <input
          type="checkbox"
          className="input-checkbox"
          value={label}
          id={employmentTypeId}
          onChange={changeEmploymentId}
        />
        <label htmlFor={employmentTypeId} className="input-label">
          {label}
        </label>
      </button>
    </li>
  )
}

export default EmploymentFilterComponent
