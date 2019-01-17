import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Icon, Button } from "@blueprintjs/core";

class ShapesPage extends Component {
	state = {
	};

	renderHead = () => (
		<Helmet>
			<title>Shapes Page</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
	)

	render() {
		return (
            <div className="route-container route-shapes">
                <div className="route-header">
					<div className="route-header-left">
						<div className="route-title">Shapes</div>
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

							<li>
								<Button
									icon="add"
									intent="warning"
									text="Add new shape"
								/>
							</li>

							<li>
								<Button
									icon="add"
									intent="success"
									text="Add new shape"
								/>
							</li>

							<li>
								<Button
									icon="add"
									intent="danger"
									text="Add new shape"
								/>
							</li>
						</ul>
					</div>
				</div>

				<div className="route-content">
					content
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
	component: connect(mapStateToProps, {})(ShapesPage)
}
