import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.jsx"
import SEO from "../components/seo"

import PostPreview from "../components/post-preview/post-preview"

const ArchivePage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const labels = data.site.siteMetadata.labels

  return (
    <Layout>
      <SEO title="Archive" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blog`, `graphql`]}/>
      <div className="post-list-main">
        <h2 className="heading mt-3">All Posts</h2>
        {
          posts.map((post) => {
            return <PostPreview node={post.node} labels={labels}  />
          })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ArchiveQuery {
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
      limit: 1000
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default ArchivePage

