import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent  } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import * as _ from 'lodash'

import ConfirmDelete from "../ConfirmDelete";

import {
	loadProduct,
	deleteProduct,
	clearCurrentProduct,
	updateProduct,
	resetProductFilters,
} from '../../../../redux/actions/manager/productActions'

import {
	loadShape,
	searchShapesManual
} from '../../../../redux/actions/manager/shapeActions'

import {
	submitForm
} from '../../../../redux/actions/formActions'

import {
	showConfirmDelete,
	hideConfirmDelete
} from '../../../../redux/actions/modalActions'

import ShapeLinker from '../../../components/linker/Linker'

import ItemDetails from './ItemDetails'


class ProductPage extends Component {
	static loadData(store, match) {
		return store.dispatch(loadProduct(match.params.productId));
	}

	state = {
	
	};

	componentDidMount() {
		this.props.loadProduct(this.props.match.params.productId, () => {
			console.log('load')
			this.loadLinkedShape()
		})
	}

	componentWillUnmount() {
		this.props.clearCurrentProduct()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.productId !== this.props.match.params.productId) {
			this.props.loadProduct(this.props.match.params.productId)
		}
	}

	saveProduct = () => {
		this.props.submitForm("product_edit")
	}

	saveProductToast = () => {
		this.refs.toaster.show({
		  message: "Product successully saved",
		  intent: Intent.PRIMARY
		});
	}

	deleteProductToast = () => {
		this.refs.toaster.show({
		  message: "Product successully deleted",
		  intent: Intent.DANGER
		});
	}

	showConfirmDialog = () => {
		this.props.showConfirmDelete()
	}

	deleteProduct = () => {
		this.props.deleteProduct(this.props.current._id)
		this.props.history.push(`/manager/products/`);
		this.props.hideConfirmDelete()
		this.deleteProductToast()
	}
	

	renderHead = () => (
		<Helmet>
			<title>Product Details Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	updateShapeLink = (values) => {

		let newProductMetadata = _.assign({}, this.props.current.metadata, {
			shapeId: values.itemToLink.value
		})

		this.props.updateProduct(this.props.current._id, newProductMetadata, () => {
			this.refs.toaster.show({
				message: "Shape successully linked",
				intent: Intent.PRIMARY
			});
			this.loadLinkedShape()
		} )
	}

	loadLinkedShape = () => {
		let shapeId = this.props.current.metadata.shapeId
		if(shapeId) {
			this.props.loadShape(shapeId, (shape) => {
				this.setState({
					loadedShape: {
						value: shape._id,
						label: shape.metadata.title
					},
					fullShape: shape
				}, () => {
				})

			})
		} else {
			this.setState({
				loadedShape: {
					value: '',
					label: ''
				}
			})
		}
	}

	searchShapes = (input, callback) => {
        this.props.searchShapesManual(
            { title: input },
            "createdAt",
            0,
            20,
            data => {
                let values = data.all.map(shape => ({
                    value: shape._id,
                    label: shape.metadata.title
                }))
                callback(values);
            }
        );
    };

	render() {
		return (
            <div className="route-container route-details">
				<Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
                <div className="route-header">
					<div className="route-header-left">
                        <div className="route-header-back">
							<Button
								icon="arrow-left"
								minimal="true"
								large="true"
								text="Back"
								onClick={() => {
										this.props.resetProductFilters()
										this.props.history.goBack()
									}
								}
							/>
                        </div>
						<div className="route-title">Product Details</div>
					</div>

					<div className="route-header-right">
						<ul className="route-actions">
							<li>
								<Button
									icon="floppy-disk"
									intent="primary"
									text="Save product"
									onClick={() => this.saveProduct()}
								/>
							</li>
							<li>
								<Button
									icon="trash"
									intent="danger"
									text="Delete product"
									onClick={() => this.showConfirmDialog()}
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
					<div className="item-container">
						<div className="item-details-container">
							<ItemDetails 
								showSaveToast={() => this.saveProductToast()}
							/>
						</div>

						<div className="item-sidebar">
							{this.state.loadedShape ? (
								<ShapeLinker
									itemLink={`/manager/shapes/${this.state.loadedShape.value}`}
									itemLabel={this.state.loadedShape.label}
									itemAvatar={this.state.fullShape.metadata.images.small}
									enableReinitialize="true"
									initialValues={{itemToLink: this.state.loadedShape}}
									loadOptions={(input, callback) => this.searchShapes(input, callback)}
									onSubmit={(values) => this.updateShapeLink(values)}
								/>
							) : ""}
							
						</div>
					</div>
				</div>

				<ConfirmDelete 
					confirmDelete={() => this.deleteProduct()} 
				/>

            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current: state.products.current
	};
}

export default {
	component: connect(mapStateToProps, {
		loadProduct,
		clearCurrentProduct,
		updateProduct,
		deleteProduct,
		submitForm,
		showConfirmDelete,
		hideConfirmDelete,
		resetProductFilters,
		loadShape,
		searchShapesManual
	})(ProductPage)
}
