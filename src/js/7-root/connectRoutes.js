import React from 'react'
import { Route } from 'react-router-dom'
import homeRouter from '../2-containers/01-Home/routes'
import loanRoutes from '../2-containers/02-Loan/routes'
import cardRoutes from '../2-containers/03-Card/routes'
import meRoutes from '../2-containers/04-Me/routes'

const allRoutes = [].concat(homeRouter, loanRoutes, cardRoutes, meRoutes)

const routesConfig = allRoutes.map(route => (
  <Route key={uuid.v4()} exact {...route} />
))

export default routesConfig

