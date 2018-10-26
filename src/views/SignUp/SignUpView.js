import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { AuthSignUp } from '../../actions/AuthActions'

class SignUpView extends Component {
	handleSignUp = async event => {
		event.preventDefault();
		const { AuthSignUp } = this.props
		const { email, password } = event.target.elements
		AuthSignUp(email, password)
	};

	render() {
		const { error } = this.props
		return (
			<div>
				<h1>Sign up</h1>
				<form onSubmit={this.handleSignUp}>
					<label>
					Email
					<input
						name="email"
						type="email"
						placeholder="Email"
					/>
					</label>
					<label>
					Password
					<input
						name="password"
						type="password"
						placeholder="Password"
					/>
					</label>
					<button type="submit">Sign Up</button>
				</form>
				{error}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { error } = state.auth
	return {
		error
	}
}

export default withRouter(
	connect(mapStateToProps, { AuthSignUp })(SignUpView)
)