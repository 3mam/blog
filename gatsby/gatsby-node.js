/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

const replaceChars = (match) => {
	const plChars = "żźćńółęąśŻŹĆĄŚĘŁÓŃ "
	const enChars = "zzcnoleasZZCASELON_"
	for (const index in plChars)
		if (match === plChars[index])
			return enChars[index]
}

const post = async ({ graphql, actions }) => {
	const postTemplate = path.resolve('./src/components/posts.js')
	const { data } = await graphql(`
	query {
		posts: allSanityBlog {
			nodes {
				title
				releaseDate
				content
			}
		}
	}	
		`)
	data.posts.nodes.forEach(element => {
		const pageName = element.title
			.replace(/[ żźćńółęąśŻŹĆĄŚĘŁÓŃ]/gi, replaceChars)
		actions.createPage({
			path: `posts/${pageName}`,
			component: postTemplate,
			context: {
				title: element.title,
				releaseDate: element.releaseDate,
				content: element.content,
			}
		})
	})
}

const addUrlToNodesArray = data => data.posts.nodes.map(v => {
	const pageName = v.title
		.replace(/[ żźćńółęąśŻŹĆĄŚĘŁÓŃ]/gi, replaceChars)
	v.url = `/posts/${pageName}`
	return v
})

const createIndexPage = (nodes, actions, template) => actions.createPage({
	path: `/`,
	component: template,
	context: {
		nodes: nodes,
	}
})

const index = async ({ graphql, actions }) => {
	const postTemplate = path.resolve('./src/components/index.js')
	const { data } = await graphql(`
	query {
		posts: allSanityBlog(sort:{
			fields: [releaseDate]
			order: DESC
		}) {
			nodes {
				title
				releaseDate
				description
			}
		}
	}
	
		`)
	const dataWithUrl = addUrlToNodesArray(data)
	createIndexPage(dataWithUrl, actions, postTemplate)
}

exports.createPages = async (params) => {
	await index(params)
	await post(params)
}