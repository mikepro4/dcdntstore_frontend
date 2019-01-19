import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent } from "@blueprintjs/core";

import {
	createCategory,
	searchCategories
} from '../../../../redux/actions/manager/categoryActions'

import SidebarLeft from './SidebarLeft'
import SidebarRight from './SidebarRight'
import Content from './Content'

class CategoriesPage extends Component {
	state = {
	};

	componentDidMount() {
		if(this.props.user) {
		  this.loadCollection()
		}
	}

	componentDidUpdate(prevprops) {
		if(prevprops.user !== this.props.user) {
			this.loadCollection()
		}

		if(prevprops.categories.updateCollection !== this.props.categories.updateCollection) {
			this.loadCollection()
		}
	}

	loadCollection = () => {
		this.props.searchCategories();
	}

	createCategory = () => {
		this.props.createCategory({
			title: "Untitled"
		}, (data) => {
			this.createCategoryToast()
		})
	}

	createCategoryToast = () => {
		this.refs.toaster.show({
		  message: "Category successully created",
		  intent: Intent.PRIMARY
		});
	}

	renderHead = () => (
		<Helmet>
			<title>Categories Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-categories">
				<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
                <div className="route-header">
					<div className="route-header-left">
						<div className="route-title">Categories</div>
					</div>

					<div className="route-header-right">
						<ul className="route-actions">
							<li>
								<Button
									icon="add"
									intent="primary"
									text="Add new category"
									onClick={() => this.createCategory()}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
                    <SidebarLeft/>
                    <Content />
                    <SidebarRight/>
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		categories: state.categories
	};
}

export default {
	component: connect(mapStateToProps, {
		createCategory,
		searchCategories
	})(CategoriesPage)
}
