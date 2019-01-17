import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'

class ListHeader extends Component {
	render() {
		const format = commaNumber.bindWith(',', '.');
		
		return (
			<div className="list-header">
                <div className="list-header-left">
						<div className="list-header-count">
							{this.props.count ? (
									<span>{format(this.props.count)} Result{this.props.count > 1 && "s"}</span>
							): "Loading..."}

						</div>
                </div>

                <div className="list-header-right">
                    right
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(withRouter(ListHeader));
