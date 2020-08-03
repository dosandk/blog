import React from "react"
import { AiTwotoneCalendar } from 'react-icons/ai';

import './date.scss';

const Date = ({ date, title = '' }) => {
  return (
    <small className="date">
      <span className="icon-wrapper">
        <AiTwotoneCalendar size="16" />
      </span>
      <span>{title} &nbsp;</span>
      <span>{date}</span>
    </small>
  )
}

export default Date
