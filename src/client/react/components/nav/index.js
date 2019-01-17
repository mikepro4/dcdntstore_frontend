import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import posed, { PoseGroup } from 'react-pose';

import commaNumber from 'comma-number'

const Parent = posed.ul({
	open: {
		opacity: 1,
		delayChildren: 500,
	  staggerChildren: 70,
		transition: {
			duration: 2200
		}
	},
  closed: {
		opacity: 1
	},
	initialPose: 'closed'
});

const Child = posed.div({
	open: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 300
		}
	},
	closed: {
		y: 0,
		opacity: 1
	},
  // closed: {
	// 	y: 50,
	// 	opacity: 0
	// },
	initialPose: 'closed'
});


class NavLinks extends Component {
	isActivePath = (pathname) => {
		return this.props.location.pathname.indexOf(pathname) !== -1
	}

	render() {

		const {isVisible, links} = this.props

		const format = commaNumber.bindWith(',', '.');

		return (
			<div className="nav-container">
					<Parent
							className={classNames({"active": !(this.props.location.pathname == "/")}, "nav-links")}
							initialPose="closed"
							pose={isVisible ? 'open' : 'closed'}
					>
							{links.map(link => {
									return (
									<li key={link.url} className={classNames("nav-link-container", {
											"nav-link-active": this.isActivePath(link.url)
											})}
									>
										<Child className="link-wrapper">
												<Link to ={link.url} className="nav-link">
													<div className="nav-link-left">
														<span className="nav-link-label">{link.name}</span>
													</div>

													<div className="nav-link-right">
														<span className="nav-link-right-label">
															{format(link.count)}
														</span>
													</div>
												</Link>
										</Child>
									</li>
									)
							})}
					</Parent>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(NavLinks);
