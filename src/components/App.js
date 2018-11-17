import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {handleInitialData} from "../actions/shared";
import Header from './Header';
import Login from './Login';
import List from './List';
import NewQuestion from './NewQuestion';
import Question from './Question';
import Ranking from './Ranking';
import 'bootstrap/dist/css/bootstrap-grid.css';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <Header onLogout={this.logout}/>
                    <Route exact path='/' component={Login}/>
                    <Route path='/list' component={List}/>
                    <Route path='/new' component={NewQuestion}/>
                    <Route path='/question/:id' component={Question}/>
                    <Route path='/ranking' component={Ranking}/>
                </Fragment>
            </Router>
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
