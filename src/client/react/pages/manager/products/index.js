import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent } from "@blueprintjs/core";

import {
	createProduct
} from '../../../../redux/actions/manager/productActions'

import Content from './Content'
import Sidebar from './Sidebar'

class ProductsPage extends Component {
	state = {
	};

	createProduct = () => {
		this.props.createProduct({
			title: "Untitled"
		}, (data) => {
			// this.props.history.push(`/manager/products/${data._id}`);
			this.createProductToast()
		})
	}

	createProductToast = () => {
		this.refs.toaster.show({
		  message: "Product successully created",
		  intent: Intent.PRIMARY
		});
	}

	renderHead = () => (
		<Helmet>
			<title>Products Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-products">
				<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
                <div className="route-header">
					<div className="route-header-left">
						<div className="route-title">Products</div>
					</div>

					<div className="route-header-right">
						<ul className="route-actions">
							<li>
								<Button
									icon="add"
									intent="primary"
									text="Add new product"
									onClick={() => this.createProduct()}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
					<Sidebar />
					<Content />
				</div>
            </div>
		);
	}
}

function mapStateToProps() {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {
		createProduct
	})(ProductsPage)
}
