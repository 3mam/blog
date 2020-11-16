/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Menu from "./menu"
import "./layout.css"

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

	return (
		<div>
			<Header siteTitle={data.site.siteMetadata?.title || "Title"} />
			<div>
				<Menu />
				<main>{children}</main>
			</div>
			<footer>
				© {new Date().getFullYear()},
					{" "}
				<a href="https://www.linkedin.com/in/konrad-chmielecki/">Konrad Chmielecki</a>
			</footer>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
