import React, {Component} from 'react';
import {connect} from 'react-redux';
import { handleInitialData } from "../actions/shared";
import { handleAddQuestion, handleAddAnswer } from "../actions/questions";
import { setAuthenticatedUser } from "../actions/authedUser";
import Question from './Question';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());




        // //TESTINNG AREA
        setTimeout(() => {
            this.props.dispatch(setAuthenticatedUser('sarahedo'));
        }, 1000);

        setTimeout(() => {
            this.props.dispatch(handleAddQuestion({
                optionOneText: 'test1',
                optionTwoText: 'test2',
                author: 'sarahedo'
            }))
        }, 2000);

        setTimeout(() => {
            this.props.dispatch(handleAddAnswer({
                authedUser: 'sarahedo',
                qid: 'xj352vofupe1dqz9emx13r',
                answer: 'optionTwo'
            }))
        }, 3000);




    }

    render() {
        const match = {
            id: '6ni6ok3ym7mf1p33lnez'
        };

        return (
            <div>
                <Question match={match}/>
            </div>
        );
    }
}

export default connect()(App);
