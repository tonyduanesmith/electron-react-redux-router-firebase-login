import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { AuthSignUp } from '../../actions/AuthActions'

class SignUpView extends Component {
	handleSignUp = async event => {
		event.preventDefault();
		const { AuthSignUp, history } = this.props
		const { email, password } = event.target.elements;
		await AuthSignUp(email, password)
		await history.push('/')
	};

	render() {
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
		</div>
	)
	}
}

export default withRouter(
	connect(null, { AuthSignUp })(SignUpView)
)