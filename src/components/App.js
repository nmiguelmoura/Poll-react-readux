import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from "../actions/shared";
import { removeAuthenticatedUser } from "../actions/authedUser";
import Header from './Header';
import Login from './Login';
import List from './List';
import NewQuestion from './NewQuestion';
import Question from './Question';
import Ranking from './Ranking';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    logout = () => {
        this.props.dispatch(removeAuthenticatedUser());
    };

    render() {
        // const match = {
        //     id: 'xj352vofupe1dqz9emx13r'
        // };

        return (
            <Router>
                <Fragment>
                    <Header onLogout={this.logout}/>
                    <Route exact path='/' component={List} />
                    <Route path='/login' component={Login} />
                    <Route path='/new' component={NewQuestion} />
                    <Route path='/question/:id' component={Question} />
                    <Route path='/ranking' component={Ranking} />
                </Fragment>
            </Router>
        );
    }
}

export default connect()(App);
