import React from 'react'

export default function IncrementButton({ IncrementButton }) {

  const handleButtonClick = () => {
    onIncrement('+')
  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="waves-effect waves-light btn green darken-2"
      >
        +
      </button>
    </div>
  )
}
