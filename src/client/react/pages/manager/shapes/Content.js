import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/List_results'

import {
	searchShapes,
	updateShapeCollectionSettings
} from '../../../../redux/actions/manager/shapeActions'

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

		if(prevprops.shapes.updateCollection !== this.props.shapes.updateCollection) {
			this.loadCollection()
		}
	}

	loadCollection = () => {
		this.props.searchShapes();
	}

	changeCollectionDisplayLimit = () => {
	}

	changeCollectionSortProperty = () => {
	}

	changeCollectionOrder = () => {
	}

	deleteItem = (id) => {

	}

	render() {
		return (
			<div className="route-content">
				<ListHeader
					count={this.props.shapes.loadedCollectionCount}
					updateShapeCollectionSettings={(item, prop) => this.props.updateShapeCollectionSettings(item, prop)}
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
					collection={this.props.shapes.loadedCollection}
					mainDisplayPropBig="title"
					mainDisplayPropSmall="catalogNumber"
					secondaryDisplayProps={[
						{
							property: "isHighlighted",
							label: "Highlighted"
						},
						{
							property: "status",
							label: "Status"
						},
						,
						{
							property: "urlName",
							label: "URL Name"
						}
					]}
					itemUrl="/manager/shapes"
					loading={this.props.shapes.loading}
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
		collection: state.shapes.loadedCollection,
		shapes: state.shapes,
	};
}

export default connect(mapStateToProps, {
	searchShapes, 
	updateShapeCollectionSettings
})(withRouter(Content));
