import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";
import Header from "./react/components/header"

FocusStyleManager.onlyShowFocusOnTabs();

import {
	fetchCurrentUser,
} from "./redux/actions/appActions";

class App extends Component {
	state = {
	};

	componentDidMount() {
		this.props.fetchCurrentUser();
	}

	render() {
		return (
			<div className="app">

				<div className="app-container">

					<Header/>
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
