import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout.jsx"
import PostPreview from "../components/post-preview"
import SEO from "../components/seo"

import "./index.scss"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels
  const currentPage = 1
  const postsPerPage = 10 // see limit in graphql query below
  const nextPage = (currentPage + 1).toString()
  const hasNextPage = data.allMarkdownRemark.totalCount > postsPerPage

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `webDevelopment`, `blog`, `graphql`]}/>
      <div className="post-list-main">
        {
          posts.map((post, index) => {
            return <PostPreview key={index} node={post.node} labels={labels}  />
          })
        }
        {
          hasNextPage &&
          <div className="mt-4 text-center">
            <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
              <span className="text-dark">Next Page →</span>
            </Link>
          </div>
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
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
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          html
          id
          timeToRead
          frontmatter {
            title
            date(
              formatString: "DD MMM YYYY"
              locale: "en-EN"
            )
            tags
            logo
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage

