import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout.jsx"
import SEO from "../components/seo"
import PostPreview from "../components/post-preview"

const PostList = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const labels = props.data.site.siteMetadata.labels
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]}/>
        <div className="post-list-main">
          {
            posts.map(post => {
              return (
                <PostPreview key={post.node.id} node={post.node} labels={labels} />
              )
            })
          }
          <div className="text-center mt-4">
            {!isFirst && (
              <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
                <span className="text-dark">← Previous Page</span>
              </Link>
            )}
            {!isLast && (
              <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
                <span className="text-dark ml-5">Next Page →</span>
              </Link>
            )}
          </div>
        </div>
    </Layout>
  )
}

export const listQuery = graphql`
  query paginateQuery($skip: Int!, $limit: Int!) {
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
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          html
          id
          frontmatter {
            title
            date
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

export default PostList
