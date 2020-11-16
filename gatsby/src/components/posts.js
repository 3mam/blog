import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default function ({ pageContext }) {
	return (
		<article>
			<h1 className="postTittle">{pageContext.title}</h1>
			<div className="postDate">{pageContext.releaseDate}</div>
			<ReactMarkdown className="postText" plugins={[gfm]} children={pageContext.content} />
		</article>
	)
}