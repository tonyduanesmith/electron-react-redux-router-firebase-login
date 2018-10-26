import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import { AuthCheck } from './actions/AuthActions'
import PrivateRoute from './components/PrivateRoute'
import HomeView from './views/Home/HomeView'
import LoginView from './views/Login/LoginView';
import SignUpView from './views/SignUp/SignUpView';

class AppRoutes extends Component {
  render(){
    const { loading, authenticated } = this.props

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
        <Fragment>
          <PrivateRoute
            exact
            path="/"
            component={HomeView}
            authenticated={authenticated}
          />
          <Route exact path='/login' component={LoginView} />
          <Route exact path='/signup' component={SignUpView} />
        </Fragment>
    );
  }
};

const mapStateToProps = (state) => {
    const { loading, authenticated, currentUser } = state.auth
    return{
        loading,
        authenticated,
        currentUser
    }
}

export default withRouter(
    connect(mapStateToProps, { AuthCheck })(AppRoutes)
)