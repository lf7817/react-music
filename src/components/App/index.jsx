import React, { Component } from 'react'
import { RouteWithMainRoutes } from '@/router/routes'
import { observer, inject } from 'mobx-react'
import { Router } from 'react-router-dom'
import history from '@/common/history'
import Header from '@/components/Header'
import Tab from '@/components/Tab'

@inject('appStore')
@observer
class App extends Component {
  
  componentDidMount () {
    
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header />
          <Tab />
          <RouteWithMainRoutes />
        </div>
      </Router>
    );
  }
}

export default App
