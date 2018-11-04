import React, {Component} from 'react';
import {connect} from 'react-redux';
import { handleInitialData } from "../actions/shared";

import { setAuthenticatedUser } from "../actions/authedUser";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());




        //TESTINNG AREA
        setTimeout(() => {
            this.props.dispatch(setAuthenticatedUser('sarahedo'));
        }, 1000);
    }

    render() {
        return (
            <div>
                APP
            </div>
        );
    }
}

export default connect()(App);
