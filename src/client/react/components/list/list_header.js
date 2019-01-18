import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import commaNumber from 'comma-number'
import {Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

class ListHeader extends Component {
	renderItem = (item, {handleClick, modifiers }) => {
		return (
			<MenuItem
				active={modifiers.active}
				key={item.value}
				text={item.label}
				onClick={handleClick}
			/>
		)
	}
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
					<Select
						items={[
							{
								value: -1,
								label: "DESC"
							},
							{
								value: 1,
								label: "ASC"
							}
						]}
						itemRenderer={this.renderItem}
						filterable={false}
						onItemSelect={(item) => this.props.updateShapeCollectionSettings(item, "order")}
					>
						Sort by: {this.props.shapes.collectionSettings.order.label}
					</Select>
					<Select
						items={this.props.sortProperties}
						itemRenderer={this.renderItem}
						filterable={false}
						onItemSelect={(item) => this.props.updateShapeCollectionSettings(item, "sortProperty")}
					>
						Sort by: {this.props.shapes.collectionSettings.sortProperty.label}
					</Select>
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location,
		shapes: state.shapes
	};
}

export default connect(mapStateToProps, {})(withRouter(ListHeader));
