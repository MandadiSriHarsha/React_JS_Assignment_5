import './index.css'

const SalaryFilterComponent = props => {
  const {onChangeSalaryRange, data} = props
  const {label, salaryRangeId} = data
  const changeSalaryId = () => {
    onChangeSalaryRange(salaryRangeId)
  }
  return (
    <li className="salary-list-item">
      <button className="salary-item-container" type="button">
        <input
          type="radio"
          name="salary"
          className="input-checkbox"
          value={label}
          id={salaryRangeId}
          onChange={changeSalaryId}
        />
        <label htmlFor={salaryRangeId} className="input-label">
          {label}
        </label>
      </button>
    </li>
  )
}

export default SalaryFilterComponent
