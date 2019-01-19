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

class SidebarRight extends Component {
	render() {
		return (
			<div className="route-sidebar route-sidebar-right">
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
})(withRouter(SidebarRight));
