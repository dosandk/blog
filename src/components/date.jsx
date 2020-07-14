import React from "react"
import moment from "moment"

const INCOMING_PATTERN = "YYYY-DD-MM"
const DATE_FORMAT = "MMMM DD, YYYY"

const Date = ({ date }) => {
  const formattedDate = moment(date, INCOMING_PATTERN).format(DATE_FORMAT)

  return (
    <>{formattedDate}</>
  )
}

export default Date
