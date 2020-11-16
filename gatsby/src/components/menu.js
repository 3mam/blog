import React, { } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const replaceChars = (match) => {
	const plChars = "żźćńółęąśŻŹĆĄŚĘŁÓŃ "
	const enChars = "zzcnoleasZZCASELON_"
	for (const index in plChars)
		if (match === plChars[index])
			return enChars[index]
}

const titleToLink = title => {
	const formatTitle = title
		.replace(/[ żźćńółęąśŻŹĆĄŚĘŁÓŃ]/gi, replaceChars)
	const url = `/posts/${formatTitle}`
	return (<Link to={url}>{title}</Link>)
}

const splitDateFromNode = arrayOfNodes => {
	const $ = (list = [], index = 0, year = 0, month = 0) => {
		if (index >= arrayOfNodes.length)
			return list
		const { releaseDate, title } = arrayOfNodes[index]
		const date = new Date(Date.parse(releaseDate))
		const newYear = date.getFullYear()
		const newMonth = date.getMonth()
		if (year !== newYear) {
			const element = { type: 'year', item: newYear.toString() }
			return $([...list, element], index, newYear, month)
		}
		else if (month !== newMonth) {
			const element = { type: 'month', item: date.toLocaleString('default', { month: 'long' }) }
			return $([...list, element], index, year, newMonth)
		}
		else {
			const element = { type: 'title', item: title }
			return $([...list, element], index + 1, newYear, newMonth)
		}
	}
	return $()
}

const addHtmlFormattingToSplitDate = ({ type, item }) => {
	if (type === 'year') {
		return ((<li key={item}>{item}</li>))
	}
	if (type === 'month') {
		return ((<ul key={item}><li>{item}</li></ul>))
	}
	if (type === 'title') {
		return ((<ul key={item}><ul><li>{titleToLink(item)}</li></ul></ul>))
	}
}


export default function () {
	const data = useStaticQuery(graphql`
	query {
		posts: allSanityBlog(sort:{
			fields: [releaseDate]
			order: DESC
		}) {
			nodes {
				title
				releaseDate
			}
		}
	}
  `)

	const itemsList = splitDateFromNode(data.posts.nodes)
		.map(addHtmlFormattingToSplitDate)

	return (
		<menu>
			<ul>{itemsList}</ul>
		</menu>
	)
}