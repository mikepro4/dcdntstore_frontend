import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import classNames from "classnames"
import Header from "./react/components/header"

FocusStyleManager.onlyShowFocusOnTabs();

import {
	fetchCurrentUser,
} from "./redux/actions/appActions";

class App extends Component {
	static loadData(store, match) {
		return store.dispatch(fetchCurrentUser());
	}
	
	state = {
	};

	componentDidMount() {
		this.props.fetchCurrentUser();
	}

	isActiveManager = (pathname) => {
		return this.props.location.pathname.indexOf('/manager') !== -1
	}

	render() {
		return (
			<div 
				className={classNames({
					"manager": this.isActiveManager(),
					"app": !this.isActiveManager()
				},)}
			>

				<div className="app-container">

					{!this.isActiveManager() && <Header/>}
					<div className="app-content">
						{renderRoutes(this.props.route.routes)}
					</div>

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
		fetchCurrentUser
    })(withRouter(App))
};
