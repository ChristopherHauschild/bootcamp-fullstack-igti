import React from 'react'

export default function Toggle(props) {

  const handleChange = (event) => {
    const { onToggle } = props

    const isChecked = event.target.checked
    onToggle(isChecked)
  }

  const { enabled, description } = props

  return (
    <div className="switch">
      <label>
        {description}
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleChange}
        />
        <span className="lever"></span>
      </label>
    </div>
  )
}
