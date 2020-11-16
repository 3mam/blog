import React from "react"
import SEO from "./seo"
import { Link } from "gatsby"
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const generatePostsList = ({ nodes }) =>
	nodes.map(({ title, releaseDate, description, url }, index) => {
		return (
			<div key={index}>
				<h1 className="postTittle">
					<Link className="tittle" to={url}>{title}</Link>
				</h1>
				<div className="postDate">{releaseDate}</div>
				<ReactMarkdown className="postDescription" plugins={[gfm]} children={description} />
			</div>
		)
	})

export default function ({ pageContext }) {
	return (
		<>
			<SEO title="Home" />
			{generatePostsList(pageContext)}
		</>
	)
}

