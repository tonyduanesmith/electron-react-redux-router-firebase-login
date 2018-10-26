import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import { AuthLogin } from '../../actions/AuthActions'

class LoginView extends Component {
	handleLogin = async (event) => {
		event.preventDefault();
		const { email, password } = event.target.elements;
		const { AuthLogin, history } = this.props
		await AuthLogin(email.value, password.value)
		await history.push('/')
	}

  	render(){
		const { error, history } =this.props
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleLogin}>
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
					<button type="submit">Login</button>
				</form>
				<p onClick={() => history.push('/signup')}>Sign Up</p>
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
  	connect(mapStateToProps, { AuthLogin })(LoginView)
);