import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class HomePage extends Component {
	state = {
	};

	renderHead = () => (
		<Helmet>
			<title>Home Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-home">
                home
            </div>
		);
	}
}

function mapStateToProps() {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(HomePage)
}
