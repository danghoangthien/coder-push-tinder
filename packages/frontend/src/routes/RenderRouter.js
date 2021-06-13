
import PropTypes from 'prop-types'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Crumbs from './breadcrumbs'

export default function RenderRouter({ routes }) {
  return (
    <Switch>
      {routes.map((r, i) => {
        return Array.isArray(r.routes) ? (
          <Route path={r.path} key={i}>
            <r.component>
              <RenderRouter routes={r.routes} />
            </r.component>
          </Route>
        ) : (
          <Route
            exact
            path={r.path}
            key={i}
            render={routeProps => {
              let crumbsRoutes = routes.filter(
                item => item.path === routeProps.match.path
              )
              while (crumbsRoutes[0].father) {
                const rootPath = routes.filter(
                  item => item.name === crumbsRoutes[0].father
                )[0]
                crumbsRoutes.unshift(rootPath)
              }
              const crumbs = crumbsRoutes.map(item => {
                const { path } = item
                return {
                  ...item,
                  path: Object.keys(routeProps.match.params).length
                    ? Object.keys(routeProps.match.params).reduce(
                      (path, param) =>
                        path.replace(
                          `:${param}`,
                          routeProps.match.params[param]
                        ),
                      path
                    )
                    : path
                }
              })
              return (
                <>
                  <Crumbs crumbs={crumbs} />
                  <r.component crumbs={''} />
                </>
              )
            }}
          />
        )
      })}
    </Switch>
  )
}

RenderRouter.propTypes = {
  routes: PropTypes.array
}
