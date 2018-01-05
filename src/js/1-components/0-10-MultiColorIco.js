import React from 'react'

export default ({ ico, num }) => (
  <i className={ico}>
    {Array(num).fill(1).map((item, index) => <span key={uuid.v4()} className={`path${index + 1}`} />)}
  </i>
)
