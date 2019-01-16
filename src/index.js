import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, BrowserRouter as Router, Redirect, Switch,
} from 'react-router-dom';
import Loadable from 'react-loadable';

import Header from './components/Header';
import Content from './components/Content';

import './components/common.css';


const Loading = () => <div>Loading...</div>;

const Albums = Loadable({
  loader: () => import(/* webpackChunkName: "albums" */'./pages/albums'),
  loading: Loading,
});

const Tags = Loadable({
  loader: () => import(/* webpackChunkName: "tags" */'./pages/tags'),
  loading: Loading,
});

const Add = Loadable({
  loader: () => import(/* webpackChunkName: "add" */'./pages/add'),
  loading: Loading,
});
// eslint-disable-next-line
class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Content>
            <Switch>
              <Route exact path='/albums' component={Albums} />
              <Route exact path='/tags' component={Tags} />
              <Route exact path='/add' component={Add} />
              <Redirect from='/' to='albums' />
            </Switch>
          </Content>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
