import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import {
	loadShape,
	clearCurrentShape,
	updateShape
} from '../../../../redux/actions/manager/shapeActions'


class ShapePage extends Component {
	static loadData(store, match) {
		return store.dispatch(loadShape(match.params.shapeId));
	}

	state = {
	};

	componentDidMount() {
		this.props.loadShape(this.props.match.params.shapeId)
	}

	componentWillUnmount() {
		this.props.clearCurrentShape()
	}

	componentDidUpdate(prevprops) {
		if(prevprops.match.params.shapeId !== this.props.match.params.shapeId) {
			this.props.loadShape(this.props.match.params.shapeId)
		}
	}

	renderHead = () => (
		<Helmet>
			<title>Shape Details Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-details">
                <div className="route-header">
					<div className="route-header-left">
                        <div className="route-header-back">
                            <Link to="/manager/shapes">
                                <Button
                                    icon="arrow-left"
                                    minimal="true"
                                    large="true"
                                    text="Back"
                                />
                            </Link>
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
								/>
							</li>
							<li>
								<Button
									icon="trash"
									intent="danger"
									text="Delete shape"
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
					<div className="item-container">
						<div className="item-details-container">
							<div className="item-details">
								details here
							</div>
						</div>

						<div className="item-sidebar">
							sidebar
						</div>
					</div>
				</div>
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
		updateShape
	})(ShapePage)
}
