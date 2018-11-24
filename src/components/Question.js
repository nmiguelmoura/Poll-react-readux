import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {QUESTION_OPTIONS} from "../utils/constants";
import {prepareQuestion} from "../utils/helpers";
import { handleAddAnswer } from "../actions/questions";
import {Redirect} from "react-router-dom";
import styles from "./Question.module.css";
import Answer from "./Answer";
import PageNotFound from "./PageNotFound";

class Question extends Component {
    state = {
        forceLogin: false
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

    onAnswer = (qid, answer) => {
        this.props.dispatch(handleAddAnswer({
            authedUser: this.props.authedUser,
            qid,
            answer
        }))
    };

    render() {
        if(this.state.forceLogin) {
            return (
                <Redirect to='/' />
            );
        }

        const qid = this.props.match.params.id;

        let question = this.props.questions[qid];

        if(!question && this.props.loading) {
            return(<div>LOADING</div>);
        }

        if(!question) {
            return(
                <PageNotFound />
            )
        }

        question = prepareQuestion(question, this.props.authedUser);

        let userAnswer;
        if(question.alreadyAnswered) {
            const user = this.props.users[this.props.authedUser];
            userAnswer = user.answers[qid];
        }

        const userAvatar = this.props.users[this.props.authedUser].avatarURL;

        return (
            <div className={`container main-container ${styles.container}`}>
                <div className={styles.author}>
                    <img src={this.props.users[this.props.authedUser].avatarURL} alt={this.props.users[this.props.authedUser].name} />

                    <h1>{this.props.users[this.props.authedUser].name} wants to know!</h1>
                    <h2>Would you rather...</h2>
                </div>

                {!question.alreadyAnswered && (
                    <div className={styles.unanswered}>

                        <button onClick={() => {
                            this.onAnswer(question.id, QUESTION_OPTIONS.OPTION_ONE)
                        }}>
                            {question.optionOne.text}
                        </button>
                        <button onClick={() => {
                            this.onAnswer(question.id, QUESTION_OPTIONS.OPTION_TWO)
                        }}>
                            {question.optionTwo.text}
                        </button>
                    </div>
                )}

                {question.alreadyAnswered && (
                    <div className={styles.answered}>
                        <Answer
                            text={question.optionOne.text}
                            votes={question.optionOne.votes.length}
                            percentage={question.optionOne.percentage}
                            alreadyAnswered={true}
                            selected={userAnswer === 'optionOne'}
                            avatarUrl={userAnswer === 'optionOne' ? userAvatar : ''}/>

                        <Answer
                            text={question.optionTwo.text}
                            votes={question.optionTwo.votes.length}
                            percentage={question.optionTwo.percentage}
                            alreadyAnswered={true}
                            avatarUrl={userAnswer === 'optionTwo' ? userAvatar : ''}/>
                    </div>
                )}

                <div className={styles.back}>
                    <Link to='/'>Back to Questions</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps({loading, authedUser, questions, users}, props) {
    return {
        loading,
        authedUser,
        questions,
        users,
        ...props
    }
}

export default connect(mapStateToProps)(Question);