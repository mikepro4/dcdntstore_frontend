import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import ListHeader from '../../../components/list/list_header'
import ListResults from '../../../components/list/List_results'

import {
	searchShapes,
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

	render() {
		return (
			<div className="route-content">
				<ListHeader
					count={this.props.shapes.loadedCollectionCount}
					changeCollectionDisplayLimit={() => this.changeCollectionDisplayLimit()}
					changeCollectionSortProperty={() => this.changeCollectionSortProperty()}
					changeCollectionOrder={() => this.changeCollectionOrder() }
				/>
				<ListResults/>
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

export default connect(mapStateToProps, {searchShapes})(withRouter(Content));
