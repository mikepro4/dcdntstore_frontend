import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"

class Header extends Component {

	renderAuthButton() {
		return this.props.user ? (
			<div className="user-info">

				<div className="user-avatar-container">
					<Link to={`/profile/${this.props.user._id}`}>
						<img
							className="user-avatar"
							src={this.props.user.profile.photos[0].value}
						/>
						<span className="user-display-name">
							{this.props.user.profile.displayName}
						</span>
					</Link>
				</div>

				<a href="/api/logout" className="logout-button">
					Logout
				</a>

			</div>
		) : (
			<div className="user-info">
				<a href="/api/auth/google" className="login-button">
					Login with Google
				</a>
			</div>
		);
	}

	render() {
		return (
			<div className="app-header">
				{this.renderAuthButton()}
				<Link to="/manager">Manager</Link>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
		location: state.router.location
	};
}

export default connect(mapStateToProps, {})(withRouter(Header));
