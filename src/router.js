import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';

function RouterConfig({ history, app }) {

  const routers = [{
    path: '/', 
      // models: () => [import('./models/app')],
      component: () => import('./routes/login/index')
  }, {
    path: '/login', 
      // models: () => [import('./models/app')],
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
    path: '/aa', 
      // models: () => [import('./models/app')],
      component: () => import('./routes/aa')
  }]
  return (
    <Router history={history}>
      <App>
        <Switch>
        {routers.map(({path, ...dynamics}, key) => (
          <Route key={key} path={path} exact component={dynamic({
            app, ...dynamics
          })} />
        ))}
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
