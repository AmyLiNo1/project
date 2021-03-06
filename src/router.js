import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';

function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routers = [{
    path: '/', 
      // models: () => [import('./models/app')],
      component: () => import('./routes/login/index')
  }, {
    path: '/login', 
      models: () => [import('./models/login')],
      component: () => import('./routes/login/index')
  }, {
    path: '/list', 
      models: () => [import('./models/list')],
      component: () => import('./routes/list/index.js')
  }, {
    path: '/detail', 
      models: () => [import('./models/list')],
      component: () => import('./routes/list/detail.js')
  }, {
    path: '/edit', 
      models: () => [import('./models/list')],
      component: () => import('./routes/list/edit.js')
  }, {
    path: '/add', 
      models: () => [import('./models/add')],
      component: () => import('./routes/add/index')
  }]
  return (
    <Router history={history}>
      <App>
        <Switch>
        <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          {routers.map(({path, ...dynamics}, key) => (
            <Route key={key} path={path} exact component={dynamic({
              app, ...dynamics
            })} />
          ))}
        <Route component={error} />
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
