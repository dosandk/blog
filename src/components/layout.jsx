/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Sidebar from "./sidebar/Sidebar"

import "./layout.scss"

const Layout = ({ children }) => {

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            tagline
            author
            contacts {
              linkedin
              github
              stackoverflow
              freecodecamp
              twitter
            }
          }
        }
      }
    `}
      render={data => (
        <main className="p-4">
          <div className="index-main">
            <div className="sidebar px-4 py-2">
              <Sidebar/>
            </div>
            {children}
          </div>
        </main>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
