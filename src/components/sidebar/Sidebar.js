import React, { useEffect, useRef } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import TechTags from "./TechTags"

import "./sidebar.scss"

const Sidebar = () => {
  const PADDING = 40;
  const sidebar = useRef(null);
  const inner = useRef(null);

  const onScroll = () => {
    const { current } = sidebar;
    const { top } = current.getClientRects()[0];

    if (top <= PADDING && !current.classList.contains('fixed')) {
      current.classList.add('fixed');
      inner.current.style.top = `${PADDING}px`;
    }

    if (top > PADDING && current.classList.contains('fixed')) {
      current.classList.remove('fixed');
      inner.current.style.top = `0px`;
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query SiteBioQuery {
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
              labels {
                tag
                tech
                name 
                size 
                color
              }
            }
          }
          allMarkdownRemark(
            limit: 10
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { published: { eq: true } } }
          ) {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div ref={sidebar} className="sidebar-main">
          <div ref={inner} className="sidebar-inner">
            <div className="page-links">
              <Link to="/">
                <span className="text-dark d-block py-1">Blog Home</span>
              </Link>
              <Link to="/archive">
                <span className="text-dark d-block py-1">Archive</span>
              </Link>
            </div>
            <div className="tech-tags mt-4">
              <TechTags labels={data.site.siteMetadata.labels} posts={data.allMarkdownRemark.edges}/>
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default Sidebar;
