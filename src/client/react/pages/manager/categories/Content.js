import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class Content extends Component {
	render() {
		return (
			<div className="route-content">
                contents
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
	};
}

export default connect(mapStateToProps, {
})(withRouter(Content));
