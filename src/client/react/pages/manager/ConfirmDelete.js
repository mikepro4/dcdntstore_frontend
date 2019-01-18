import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Dialog, Button, Intent, ButtonGroup } from "@blueprintjs/core";

import {
    hideConfirmDelete
} from '../../../redux/actions/modalActions'

class ConfirmDelete extends Component {
    onClose = () => {
       this.props.hideConfirmDelete() 
    }
	render() {
		return (
			<div>
				<Dialog
					iconName="link"
					isOpen={this.props.modals.confirmDelete}
					onClose={this.onClose}
					title="Delete Item"
					className="entity-type-linker"
				>
					<div className="bp3-dialog-body">
						<div className="dialog-header">
							<h1>Are you sure you want to delete this item?</h1>
						</div>

						<div className="dialog-content">
							This action is irreversible.
						</div>
					</div>
					<div className="bp3-dialog-footer">
						<div className="bp3-dialog-footer-actions">
							<Button text="Cancel" onClick={this.onClose} />
							<Button
								intent={Intent.DANGER}
								onClick={() => this.props.confirmDelete()}
								text="Delete Item Forever"
							/>
						</div>
					</div>
				</Dialog>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
        modals: state.modals
	};
}

export default connect(mapStateToProps, {
    hideConfirmDelete
})(withRouter(ConfirmDelete));
