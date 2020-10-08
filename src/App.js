import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import Aux from './hoc/Auxilliary/Auxilliary';

import Layout from './hoc/Layout/Layout';
import Header from './components/Navigation/Header/Header';
import SideNav from './components/Navigation/SideNav/SideNav';
import history from './hoc/History/history';
import AnimatedRoutes from './hoc/AnimatedRoutes/AnimatedRoutes';
import PagesTransition from './hoc/AnimatedRoutes/PagesTransition';

class App extends Component {
  render () {
    return (
      <Layout history={history} >
        <SideNav />
        <Header history={history} />
        <Route render={({location}) => {
          return (
            <AnimatedRoutes location={location} />
          );
        }} />
        <PagesTransition />
      </Layout>
    );
  }
}

export default App;