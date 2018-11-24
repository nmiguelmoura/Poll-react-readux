import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {handleInitialData} from "../actions/shared";
import Header from './Header';
import Login from './Login';
import List from './List';
import NewQuestion from './NewQuestion';
import Question from './Question';
import Ranking from './Ranking';
import 'bootstrap/dist/css/bootstrap-grid.css';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import PageNotFound from "./PageNotFound";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Fragment>
                        <Header onLogout={this.logout}/>
                        <Switch>
                            <Route exact path='/' component={Login}/>
                            <Route path='/list' component={List}/>
                            <Route path='/add' component={NewQuestion}/>
                            <Route path='/question/:id' component={Question}/>
                            <Route path='/leaderboard' component={Ranking}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </Fragment>
                </Router>
                <Alert stack={{limit: 3}}/>
            </Fragment>
        );
    }
}

function mapStateToProps({authedUser}, props) {
    return {
        onPageLogin: !authedUser,
        ...props
    };
}

export default connect(mapStateToProps)(App);
