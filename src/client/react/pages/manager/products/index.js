import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class ProductsPage extends Component {
	state = {
	};

	renderHead = () => (
		<Helmet>
			<title>Products Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-products">
                products
            </div>
		);
	}
}

function mapStateToProps() {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {})(ProductsPage)
}
