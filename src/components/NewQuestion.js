import React, {Component} from 'react';
import { connect } from 'react-redux';
import {SUBMIT_QUESTION} from "../res/texts";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    };

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
                author: this.state.authedUser
            }));
        } else {

        }
    };

    render() {
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