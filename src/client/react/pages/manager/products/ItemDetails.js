import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as _ from "lodash";

import {
	updateProduct
} from '../../../../redux/actions/manager/productActions'

import ImageUploader from '../../../components/imageUploader/index'

import ItemDetailsForm from "./ItemDetailsForm"

class ItemDetails extends Component {
	handleSubmit = values => {
		let newProductValues = _.merge({}, this.props.product.metadata, values)
		this.props.updateProduct(this.props.product._id, newProductValues)
		this.props.showSaveToast()
	}

	updateImage = (url, size) => {
		let newProductImages = _.merge({}, this.props.product.metadata.images, {
			[size]: url
		})

		let newProductValues = _.merge({}, this.props.product.metadata, {
			images: newProductImages
		})
		this.props.updateProduct(this.props.product._id, newProductValues)
		this.props.showSaveToast()
	}

	render() {
		return (
			<div className="item-details">
				<div className="item-images">
					<div className="item-images-left">
						<div className="item-image item-image-large">
							<ImageUploader 
								onSuccess={(url) => this.updateImage(url, "large")}
								preset="product_large"
								canUpload="true"
								imageUrl={this.props.product.metadata && this.props.product.metadata.images.large}
							/>
						</div>
					</div>

					<div className="item-images-right">
						<div className="item-image item-image-medium">
							<ImageUploader 
								onSuccess={(url) => this.updateImage(url, "medium")}
								preset="product_medium"
								canUpload="true"
								imageUrl={this.props.product.metadata && this.props.product.metadata.images.medium}
							/>
						</div>

						<div className="item-image item-image-small">
							<ImageUploader 
								onSuccess={(url) => this.updateImage(url, "small")}
								preset="product_small"
								canUpload="true"
								imageUrl={this.props.product.metadata && this.props.product.metadata .images.small}
							/>
						</div>
					</div>
				</div>
                <ItemDetailsForm
					ref="ItemDetails"
					enableReinitialize="true"
					initialValues={this.props.product ? this.props.product.metadata : ""}
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
		product: state.products.current,
	};
}

export default connect(mapStateToProps, {updateProduct})(withRouter(ItemDetails));
