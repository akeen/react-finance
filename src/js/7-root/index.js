import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Boot from './Boot'
import App from './App'
import routes from './routes'
import '../../styles/normalize.scss'
import '../../styles/font.scss'
import '../../styles/plugin.scss'
import '../../styles/app.scss'
import '../../styles/special.scss'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Boot>
      <App>
        <ConnectedRouter history={history}>
          <div className="box bg-body h-full" style={{ touchAction: 'none' }}>
            {routes}
          </div>
        </ConnectedRouter>
      </App>
    </Boot>
  </Provider>
)

export default Root
