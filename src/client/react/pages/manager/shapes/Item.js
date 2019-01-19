import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button, Position, Toaster, Classes, Intent  } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import ConfirmDelete from "../ConfirmDelete";

import {
	loadShape,
	deleteShape,
	clearCurrentShape,
	updateShape,
	resetShapeFilters
} from '../../../../redux/actions/manager/shapeActions'

import {
	searchProductsManual
} from '../../../../redux/actions/manager/productActions'

import {
	submitForm
} from '../../../../redux/actions/formActions'

import {
	showConfirmDelete,
	hideConfirmDelete
} from '../../../../redux/actions/modalActions'

import ItemDetails from './ItemDetails'


class ShapePage extends Component {
	static loadData(store, match) {
		return store.dispatch(loadShape(match.params.shapeId));
	}

	state = {
		linkedProducts: ""
	};

	componentDidMount() {
		this.props.loadShape(this.props.match.params.shapeId)
		this.searchProducts()
	}

	componentWillUnmount() {
		this.props.clearCurrentShape()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.shapeId !== this.props.match.params.shapeId) {
			this.props.loadShape(this.props.match.params.shapeId)
			this.searchProducts()
		}
	}

	saveShape = () => {
		this.props.submitForm("shape_edit")
	}

	saveShapeToast = () => {
		this.refs.toaster.show({
		  message: "Shape successully saved",
		  intent: Intent.PRIMARY
		});
	}

	deleteShapeToast = () => {
		this.refs.toaster.show({
		  message: "Shape successully deleted",
		  intent: Intent.DANGER
		});
	}

	showConfirmDialog = () => {
		this.props.showConfirmDelete()
	}

	deleteShape = () => {
		this.props.deleteShape(this.props.current._id)
		this.props.history.push(`/manager/shapes/`);
		this.props.hideConfirmDelete()
		this.deleteShapeToast()
	}
	

	renderHead = () => (
		<Helmet>
			<title>Shape Details Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	searchProducts = () => {
        this.props.searchProductsManual(
            { shapeId: this.props.match.params.shapeId },
            "createdAt",
            0,
            2000,
            data => {
				this.setState({
					linkedProducts: data.all
				})
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
										this.props.resetShapeFilters()
										this.props.history.goBack()
									}
								}
							/>
                        </div>
						<div className="route-title">Shape Details</div>
					</div>

					<div className="route-header-right">
						<ul className="route-actions">
							<li>
								<Button
									icon="floppy-disk"
									intent="primary"
									text="Save shape"
									onClick={() => this.saveShape()}
								/>
							</li>
							<li>
								<Button
									icon="trash"
									intent="danger"
									text="Delete shape"
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
								showSaveToast={() => this.saveShapeToast()}
							/>
						</div>

						<div className="item-sidebar">
							{this.state.linkedProducts && this.state.linkedProducts.map(product => {
								return (
									<div className="linked-product-container">
										<Link 
											to={`/manager/products/${product._id}`}
											className="linked-product"
										>
											<div className="linked-product-image">
												<img src={product.metadata.images.small}/>
											</div>
											{product.metadata.title}
										</Link>
									</div>
								)
							})}
						</div>
					</div>
				</div>

				<ConfirmDelete 
					confirmDelete={() => this.deleteShape()} 
				/>

            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		current: state.shapes.current
	};
}

export default {
	component: connect(mapStateToProps, {
		loadShape,
		clearCurrentShape,
		updateShape,
		deleteShape,
		submitForm,
		showConfirmDelete,
		hideConfirmDelete,
		resetShapeFilters,
		searchProductsManual
	})(ShapePage)
}
