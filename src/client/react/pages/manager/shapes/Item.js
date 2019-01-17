import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import {
	createShape
} from '../../../../redux/actions/manager/shapeActions'


class ShapesPage extends Component {
	state = {
	};

	renderHead = () => (
		<Helmet>
			<title>Shape Details Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-shapes">
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
									icon="add"
									intent="primary"
									text="Add new shape"
								/>
							</li>
							<li>
								<Button
									icon="add"
									text="Add new shape"
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content-container">
                    {this.props.match.params.shapeId}
				</div>
            </div>
		);
	}
}

function mapStateToProps() {
	return {
	};
}

export default {
	component: connect(mapStateToProps, {
		createShape
	})(ShapesPage)
}
