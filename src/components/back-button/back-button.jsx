import React from "react"
import { navigate } from "@reach/router";

const BackButton = () => {
  return (
    <button onClick={() => navigate(-1)} type="button" className="btn btn-light">
      ← Back
    </button>
  )
}

export default BackButton;
