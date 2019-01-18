import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as _ from "lodash";

import {
	updateShape
} from '../../../../redux/actions/manager/shapeActions'

import ImageUploader from '../../../components/imageUploader/index'

import ItemDetailsForm from "./ItemDetailsForm"

class ItemDetails extends Component {
	handleSubmit = values => {
		let newShapeValues = _.merge({}, this.props.shape.metadata, values)
		this.props.updateShape(this.props.shape._id, newShapeValues)
		this.props.showSaveToast()
	}

	updateImage = (url, size) => {
		let newShapeImages = _.merge({}, this.props.shape.metadata.images, {
			[size]: url
		})

		let newShapeValues = _.merge({}, this.props.shape.metadata, {
			images: newShapeImages
		})
		this.props.updateShape(this.props.shape._id, newShapeValues)
		this.props.showSaveToast()
	}

	render() {
		return (
			<div className="item-details">
				<div className="item-images">
					<div className="item-image-large">
						Large:
						<ImageUploader 
							onSuccess={(url) => this.updateImage(url, "large")}
							preset="shape_large"
							canUpload="true"
							imageUrl={this.props.shape.metadata && this.props.shape.metadata.images.large}
						/>
					</div>

					<div className="item-image-large">
						Medium:
						<ImageUploader 
							onSuccess={(url) => this.updateImage(url, "medium")}
							preset="shape_medium"
							canUpload="true"
							imageUrl={this.props.shape.metadata && this.props.shape.metadata.images.medium}
						/>
					</div>

					<div className="item-image-large">
						Small:
						<ImageUploader 
							onSuccess={(url) => this.updateImage(url, "small")}
							preset="shape_small"
							canUpload="true"
							imageUrl={this.props.shape.metadata && this.props.shape.metadata .images.small}
						/>
					</div>
				</div>
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
