import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.jsx"
import SEO from "../components/seo"
import TechTag from "../components/tags/TechTag"
import Date from "../components/date"
import BackButton from "../components/back-button"

const BlogPost = (props) => {
  const { original } = props.data.imageSharp
  const post = props.data.markdownRemark
  const labels = props.data.site.siteMetadata.labels
  const { tags } = post.frontmatter;

  const getTechTags = (tags = []) => {
    const techTags = [];

    tags.forEach((tag, i) => {
      labels.forEach((label) => {
        if (tag === label.tag) {
          techTags.push(
            <TechTag
              key={i}
              tag={label.tag}
              tech={label.tech}
              name={label.name}
              size={label.size}
              color={label.color}/>
          )
        }
      })
    })
    return techTags
  }

  const description = post.excerpt.replace(post.frontmatter.title, '').trim('');

  return (
    <Layout>
      <SEO title={post.frontmatter.title}
           description={description}
           logo={original.src}/>
        <div className="post-main">
          <BackButton />

          <div className="mt-3">
            <div className="text-right">
              <Date title="Published on" date={post.frontmatter.date}/>
              <br/>
              <small>Read {post.timeToRead} min</small>
            </div>

            <div className="d-block">
              {getTechTags(tags)}
            </div>
            {/* Post */}
            <div dangerouslySetInnerHTML={{ __html: post.html }}/>
          </div>
        </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        url
        title
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        title
        date
        tags
      }
      timeToRead
    }
    imageSharp {
      id
      original {
        src
      }
    }
  }
`

export default BlogPost
