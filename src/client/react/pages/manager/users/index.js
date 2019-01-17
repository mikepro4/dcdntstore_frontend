import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class UsersPage extends Component {
	state = {
	};

	renderHead = () => (
		<Helmet>
			<title>Users Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-users">
                users
            </div>
		);
	}
}

function mapStateToProps() {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(UsersPage)
}
