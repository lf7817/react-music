import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Recommend from '../components/Recommend'
import Search from '../components/Search'
import Rank from '../components/Rank'
import Singer from '../components/Singer'

export const routes = [
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/singer',
    component: Singer
  }
]

export const RouteWithSubRoutes = (route) => (
  <Route 
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes}/>
    )}/>
)

export const RouteWithMainRoutes = () => (
  <Route render={() => (
    <Fragment>
      <Route path="/" exact render={() => <Redirect to="/recommend" />}/>
      {
        routes.map(route => (
          <RouteWithSubRoutes {...route} key={route.path}/>
        ))
      }
    </Fragment>
  )}/>
)