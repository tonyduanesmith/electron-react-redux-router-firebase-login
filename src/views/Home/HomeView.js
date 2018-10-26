import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'

import { AuthLogout } from '../../actions/AuthActions'

class HomeView extends Component{
    handleLogout = () => {
        const { AuthLogout } = this.props
        AuthLogout()
    }
    render = () => {
        const { currentUser } = this.props
        return (
            <Fragment>
                Hello {currentUser.email}
                <button onClick={this.handleLogout}>logout</button>
            </Fragment>
        )
    }
}

const mapStateTpProps = (state) => {
    const { currentUser } = state.auth
    return {
        currentUser
    }
}

export default connect(mapStateTpProps, { AuthLogout })(HomeView)