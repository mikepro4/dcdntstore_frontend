import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Icon, Button } from "@blueprintjs/core";

import NavLinks from '../../components/nav'

class Manager extends Component {
	state = {
	};

	componentDidMount() {
	}

	render() {

		let contentLinks = [
			{
			  url: "/manager/shapes",
				name: "Shapes",
				count: 1350
			},
			{
			  url: "/manager/products",
				name: "Products",
				count: 10679,
			},
			{
			  url: "/manager/users",
				name: "Users",
				count: 2398
			}
			]
			
		let organizationLink = [
			{
				url: "/manager/categories",
				name: "Categories"
			},
			{
				url: "/manager/productTypes",
				name: "Product Types"
			},
			{
				url: "/manager/sources",
				name: "Sources"
			},
			{
				url: "/manager/labels",
				name: "Labels"
			}
		]

		let reactionLinks = [
			{
				url: "/manager/likes",
				name: "Likes"
			},
			{
				url: "/manager/shares",
				name: "Shares"
			},
			{
				url: "/manager/purchases",
				name: "Purchases"
			}
		]

		let interactionLinks = [
			{
				url: "/manager/clicks",
				name: "Clicks"
			},
			{
				url: "/manager/pageViews",
				name: "Page Views"
			}
		]

		return (
			<div className="manager-container">

					<div className="manager-sidebar">
						<div className="manager-header">
							<div className="manager-header-left">
								<div className="manager-header-title">DCDNT</div>
								<div className="manager-header-subtitle">MANAGER</div>
							</div>

							<div className="manager-header-right">
								<Link to="/">
									<Button 
										icon="eye-open"
										large="true"
										minimal="true">
									</Button>
								</Link>
							</div>
						</div>

						<div className="manager-sidebar-section">
							<div className="manager-sidebar-section-name">CONTENT</div>
							<NavLinks links={contentLinks} />
						</div>

						<div className="manager-sidebar-section">
							<div className="manager-sidebar-section-name">ORGANIZATION</div>
							<NavLinks links={organizationLink} />
						</div>

						<div className="manager-sidebar-section">
							<div className="manager-sidebar-section-name">REACTIONS</div>
							<NavLinks links={reactionLinks} />
						</div>

						<div className="manager-sidebar-section">
							<div className="manager-sidebar-section-name">INTERACTIONS</div>
							<NavLinks links={interactionLinks} />
						</div>

					</div>

					<div className="manager-content">
							{renderRoutes(this.props.route.routes)}
					</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {
    })(withRouter(Manager))
};
