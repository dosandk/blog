import React from "react"
import { AiTwotoneCalendar } from 'react-icons/ai';
import moment from "moment"

import './date.scss';

const INCOMING_PATTERN = "YYYY-DD-MM"
const DATE_FORMAT = "MMMM DD, YYYY"

const Date = ({ date, title = '' }) => {
  const formattedDate = moment(date, INCOMING_PATTERN).format(DATE_FORMAT)

  return (
    <small className="date">
      <span className="icon-wrapper">
        <AiTwotoneCalendar size="16" />
      </span>
      {'  '}
      <span>{title}</span>
      {' '}
      <span>{formattedDate}</span>
    </small>
  )
}

export default Date
