import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Sidebar extends Component {
	render() {
		return (
			<div className="route-sidebar">
                sidebar
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(withRouter(Sidebar));
