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
        <div className="root">
          <header className="header" />

          <main className="main container">
            <div className="main-inner row">
              <div className="col-md-9 pl-lg-5 pr-lg-5">
                {children}
              </div>
              <div className="col-md-3 position-relative">
                <Sidebar/>
              </div>
            </div>
          </main>

          <footer className="footer">

          </footer>
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
