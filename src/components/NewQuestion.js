import React, {Component} from 'react';
import { connect } from 'react-redux';
import {SUBMIT_QUESTION} from "../res/texts";
import { handleAddQuestion } from "../actions/questions";
import {Redirect} from "react-router-dom";

class NewQuestion extends Component {
    state = {
        forceLogin: false,
        optionOne: '',
        optionTwo: ''
    };

    componentDidMount() {
        this.checkIfLoginNeeded(this.props.authedUser);
    }

    componentWillReceiveProps(props) {
        this.checkIfLoginNeeded(props.authedUser);
    }

    checkIfLoginNeeded(authedUser) {
        if(!authedUser) {
            this.setState(prev => ({
                forceLogin: true
            }));
        }
    }

    onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState(prev => ({
            [name]: value
        }));
    };

    submit = (event) => {
        event.preventDefault();

        if(this.state.optionOne && this.state.optionTwo) {
            this.props.dispatch(handleAddQuestion({
                optionOneText: this.state.optionOne,
                optionTwoText: this.state.optionTwo,
                author: this.props.authedUser
            }));
        } else {

        }
    };

    render() {
        if(this.state.forceLogin) {
            return (
                <Redirect to='/' />
            );
        }

        return(
            <form>
                <input
                    type='text'
                    name='optionOne'
                    value={this.state.optionOne}
                    onChange={this.onChange}/>
                <input
                    type='text'
                    name='optionTwo'
                    value={this.state.optionTwo}
                    onChange={this.onChange}/>
                <button onClick={this.submit}>
                    { SUBMIT_QUESTION }
                </button>
            </form>
        );
    }
}

function mapStateToProps({ loading, authedUser }) {
    return {
        loading,
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);