import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class ShapesPage extends Component {
	state = {
	};

	renderHead = () => (
		<Helmet>
			<title>Shapes Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-shapes">
                shapes
            </div>
		);
	}
}

function mapStateToProps() {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(ShapesPage)
}
