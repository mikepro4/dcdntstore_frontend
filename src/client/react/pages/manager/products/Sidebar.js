import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import ItemFiltersForm from "./ItemFiltersForm"

import {
	searchProducts,
	updateProductFilters,
	resetProductFilters
} from '../../../../redux/actions/manager/productActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
	handleSubmit = values => {
		this.props.searchProducts()
	}

	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Product Filters
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							text="Reset"
							minimal="true"
							onClick={()=>  {
								this.props.resetProductFilters()
								this.props.searchProducts()
							}}
						/>
						<Button
							intent={Intent.PRIMARY}
							minimal="true"
							text="Search"
							onClick={()=> this.props.submitForm("product_filters")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">
					<ItemFiltersForm
						ref="ItemFilters"
						onSubmit={this.handleSubmit.bind(this)}
						onChange={(values) => this.props.updateProductFilters(values)}
					/>
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		products: state.products
	};
}

export default connect(mapStateToProps, {
	searchProducts,
	updateProductFilters,
	resetProductFilters,
	submitForm
})(withRouter(Sidebar));
