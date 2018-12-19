import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';

class App extends Component {
  constructor(props) {
    super(props);
    fetch(
      'https://dev.clappy.live/api/client/tvshow/view?domain=gameofthrones8.dev.clappy.live'
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log();
        this.setState({
          arr: data.response.data.projects.data[0].modules.data
        });
        // this.state = { arr: data.response.data.projects.data[0].modules.data };
      });
    this.state = { arr: [] };
    console.log(this.state.arr);
    this.c = [About, Topics];
  }
  merafunction(i) {
    switch (i) {
      case 0:
        return BlueView;
      case 1:
        return GreenView;
      default:
        return null;
    }
    // return res;
  }

  render(props) {
    console.log(this.state.arr);
    return (
      <Router>
        <div>
          <Header />
          <SwipeableRoutes>
            <Route exact path="/" component={RedView} />
            {this.state.arr.map((object, i) => (
              <Route
                path={'/' + object.poll_type + '/' + object.id}
                key={i}
                component={this.merafunction(object.module_id)}
              />
            ))}
            {/* {this.generateRoute()} */}
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/topics" component={Topics} /> */}
          </SwipeableRoutes>
        </div>
      </Router>
    );
  }
}

const RedView = () => (
  <div style={{ height: 300, backgroundColor: 'red' }}>Red</div>
);
const BlueView = () => (
  <div style={{ height: 300, backgroundColor: 'blue' }}>Blue</div>
);
const GreenView = () => (
  <div style={{ height: 300, backgroundColor: 'green' }}>Green</div>
);

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);
var arr = ['about', 'topics'];
const Header = () => (
  // constructor(){
  // super();
  // this.arr = ['about','topics']
  // }
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    {arr.map((object, i) => (
      <li key={i}>
        <Link to={'/' + object}>{object}</Link>
      </li>
    ))}
  </ul>
);

export default App;
