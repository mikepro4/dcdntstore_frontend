import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import ItemFiltersForm from "./ItemFiltersForm"

import {
	searchShapes,
	updateShapeFilters,
	resetShapeFilters
} from '../../../../redux/actions/manager/shapeActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
	handleSubmit = values => {
		this.props.searchShapes()
	}

	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Shape Filters
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							text="Reset"
							minimal="true"
							onClick={()=>  {
								this.props.resetShapeFilters()
								this.props.searchShapes()
							}}
						/>
						<Button
							intent={Intent.PRIMARY}
							minimal="true"
							text="Search"
							onClick={()=> this.props.submitForm("shape_filters")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">
					<ItemFiltersForm
						ref="ItemFilters"
						onSubmit={this.handleSubmit.bind(this)}
						onChange={(values) => this.props.updateShapeFilters(values)}
					/>
				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		shapes: state.shapes
	};
}

export default connect(mapStateToProps, {
	searchShapes,
	updateShapeFilters,
	resetShapeFilters,
	submitForm
})(withRouter(Sidebar));
