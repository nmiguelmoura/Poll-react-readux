import React, {Component} from 'react';
import { connect } from 'react-redux';
import {SUBMIT_QUESTION} from "../res/texts";
import { handleAddQuestion } from "../actions/questions";
import {Redirect} from "react-router-dom";
import styles from './NewQuestion.module.css';

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
            this.props.history.push('/list');
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
            <div className={`container main-container`}>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className={styles.h1}>Would you rather...</h1>
                    </div>
                </div>
                <form className='row'>
                    <div className={`col-12 ${styles['form-group']}`}>
                        <label htmlFor='optionOne'>
                            Option One
                        </label>
                        <input
                            type='text'
                            name='optionOne'
                            value={this.state.optionOne}
                            onChange={this.onChange}/>
                    </div>
                    <div className={`col-12 ${styles['form-group']}`}>
                        <label htmlFor='optionTwo'>
                            Option Two
                        </label>
                        <input
                            type='text'
                            name='optionTwo'
                            value={this.state.optionTwo}
                            onChange={this.onChange}/>
                    </div>
                    <div className='col-12'>
                        <button
                            className={styles.button}
                            onClick={this.submit}>
                            { SUBMIT_QUESTION }
                        </button>
                    </div>
                </form>
            </div>
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