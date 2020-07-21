import React from "react"
import { Link } from "gatsby"
import Date from "../date"
import TechTag from "../tags/TechTag"

import './post-preview.scss'

const getTechTags = (tags, labels) => {
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
};

const PostPreview = ({node, labels}) => {
  const { tags, title } = node.frontmatter;

  return (
    <div key={node.id} className="container mt-5">
      <Link
        to={node.fields.slug}
        className="text-dark"
      >
        <h2 className="title">{node.frontmatter.title}</h2>
      </Link>

      <div className="date-container">
         <Date title="Published on" date={node.frontmatter.date}/>
      </div>

      <div className="mb-3">
        <p className="mt-3 d-inline">{node.excerpt.replace(title, '')}</p>
        {' '}
        <Link
          to={node.fields.slug}
          className="text-primary bold"
        >
          <small>Read full post</small>
        </Link>
      </div>

      <div>
        {getTechTags(tags, labels)}
      </div>
    </div>
  )
}

export default PostPreview;
