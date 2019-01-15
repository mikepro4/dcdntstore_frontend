import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

class App extends Component {
	state = {
	};

	componentDidMount() {
	}

	render() {
		return (
			<div className="app">

				<div className="app-container">

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
    })(withRouter(App))
};
