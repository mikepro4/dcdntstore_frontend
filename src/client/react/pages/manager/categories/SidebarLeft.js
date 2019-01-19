import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Button, Intent  } from "@blueprintjs/core";
import * as _ from 'lodash'

import {
	searchCategories,
} from '../../../../redux/actions/manager/categoryActions'

import {
	submitForm,
} from '../../../../redux/actions/formActions'

class Sidebar extends Component {
	render() {
		return (
			<div className="route-sidebar">
                <div className="route-sidebar-header">

					<div className="route-sidebar-header-section route-sidebar-header-left">
						<div className="route-sidebar-header-title">
							Category Structure
						</div>
					</div>

					<div className="route-sidebar-header-section route-sidebar-header-right">
						<Button
							intent={Intent.PRIMARY}
                            minimal="true"
                            icon="add"
							text="New"
							onClick={()=> console.log("add new")}
						/>
					</div>
				</div>

				<div className="route-sidebar-content">

				</div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		categorys: state.categorys
	};
}

export default connect(mapStateToProps, {
	searchCategories,
	submitForm
})(withRouter(Sidebar));
