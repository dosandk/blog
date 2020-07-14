import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.jsx"
import SEO from "../components/seo"
import TechTag from "../components/tags/TechTag"
import Badge from "react-bootstrap/Badge"
import Date from "../components/date"

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const labels = props.data.site.siteMetadata.labels
  const tags = post.frontmatter.tags

  const getTechTags = (tags) => {
    const techTags = []
    tags.forEach((tag, i) => {
      labels.forEach((label) => {
        if (tag === label.tag) {
          techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size}
                                 color={label.color}/>)
        }
      })
    })
    return techTags
  }

  // const formattedDate = moment(post.frontmatter.date, 'YYYY-DD-MM').format(`MMMM DD, YYYY`);

  return (
    <Layout>
      <SEO title={post.frontmatter.title}/>
        <div className="post-main">
          <SEO title={post.frontmatter.title}/>

          <div>Back</div>
          <div className="mt-3">
            <div className="text-right">
              <Badge variant="warning">
                <i>Published on </i>
                <Date date={post.frontmatter.date}/>
              </Badge>
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
      frontmatter {
        title
        date
        tags
      }
    }
  }
`

export default BlogPost
