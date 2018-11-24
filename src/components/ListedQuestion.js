import React from 'react';
import styles from './ListedQuestion.module.css';
import Answer from './Answer';

const ListedQuestion = (props) => {
    const {question, user} = props;

    return (
        <div className={`container ${styles.container}`}>
            <div className='row'>
                <div className={`col-4 ${styles.author}`}>
                    <img
                        src={user.avatarURL}
                        alt={user.name}/>

                    <p>{user.name}</p>
                </div>
                <div className={`col-8 ${styles.questions}`}>
                    <div>
                        <h1>Would you rather...</h1>
                    </div>

                    <Answer
                        text={question.optionOne.text}
                        votes={question.optionOne.votes.length}
                        percentage={question.optionOne.percentage}
                        alreadyAnswered={question.alreadyAnswered} />

                    <Answer
                        text={question.optionTwo.text}
                        votes={question.optionTwo.votes.length}
                        percentage={question.optionTwo.percentage}
                        alreadyAnswered={question.alreadyAnswered} />

                </div>
                <div className='offset-4 col-8'>
                    <button
                        className={styles.button}
                        onClick={() => props.onPollClick(question.id)}>View Poll</button>
                </div>
            </div>
        </div>
    );
};

export default ListedQuestion;