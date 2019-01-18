import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as _ from "lodash";

import {
	updateShape
} from '../../../../redux/actions/manager/shapeActions'

import ItemDetailsForm from "./ItemDetailsForm"

class ItemDetails extends Component {
	handleSubmit = values => {
		let newShapeValues = _.merge({}, this.props.shape.metadata, values)
		this.props.updateShape(this.props.shape._id, newShapeValues)
		this.props.showSaveToast()
	}
	render() {
		return (
			<div className="item-details">
                <ItemDetailsForm
					ref="ItemDetails"
					enableReinitialize="true"
					initialValues={this.props.shape ? this.props.shape.metadata : ""}
					onSubmit={this.handleSubmit.bind(this)}
				/>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
		shape: state.shapes.current,
	};
}

export default connect(mapStateToProps, {updateShape})(withRouter(ItemDetails));
