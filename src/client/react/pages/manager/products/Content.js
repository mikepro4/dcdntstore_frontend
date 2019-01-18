import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/List_results'

import {
	searchProducts,
	updateProductCollectionSettings
} from '../../../../redux/actions/manager/productActions'

class Content extends Component {

	componentDidMount() {
		if(this.props.user) {
		  this.loadCollection()
		}
	}

	componentDidUpdate(prevprops) {
		if(prevprops.user !== this.props.user) {
			this.loadCollection()
		}

		if(prevprops.products.updateCollection !== this.props.products.updateCollection) {
			this.loadCollection()
		}
	}

	loadCollection = () => {
		this.props.searchProducts();
	}

	render() {
		return (
			<div className="route-content">
				<ListHeader
					count={this.props.products.loadedCollectionCount}
					updateProductCollectionSettings={(item, prop) => this.props.updateProductCollectionSettings(item, prop)}
					sortProperties={[
						{
							value: "createdAt",
							label: "Date Created"
						},
						{
							value: "title",
							label: "Title"
						},
						{
							value: "description",
							label: "Description"
						},
						{
							value: "catalogNumber",
							label: "Catalog Number"
						}
					]}
				/>
				<ListResults
					collection={this.props.products.loadedCollection}
					mainDisplayPropBig="title"
					mainDisplayPropSmall="catalogNumber"
					secondaryDisplayProps={[
					]}
					itemUrl="/manager/products"
					loading={this.props.products.loading}
					displayImage={true}
					deleteItem={(id) => this.props.deleteItem(id)}
				/>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location,
		collection: state.products.loadedCollection,
		products: state.products,
	};
}

export default connect(mapStateToProps, {
	searchProducts, 
	updateProductCollectionSettings
})(withRouter(Content));
