import React from 'react';
import { Router } from 'react-router';
import AppRoutes from './AppRoutes'
import { history } from './history'

const BrowserWrapper = () => {
    return (
      <Router history={history}>
        <AppRoutes />
      </Router>
    )
}

export default BrowserWrapper