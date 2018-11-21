import React from 'react';
import styles from './ListedQuestion.module.css';

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
                        <h3>Would you rather...</h3>
                    </div>
                    <div className={styles.question}>
                        <p>{question.optionOne.text}</p>
                        {question.alreadyAnswered &&
                            <p className={styles.result}>
                                <span className={styles['result-inner']} style={{'width': `${question.optionOne.percentage}%`}}>{question.optionOne.percentage}%</span>
                            </p>
                        }
                    </div>
                    <div className={styles.question}>
                        <p>{question.optionTwo.text}</p>
                        {question.alreadyAnswered &&
                            <p className={styles.result}>
                                <span className={styles['result-inner']} style={{'width': `${question.optionTwo.percentage}%`}}>{question.optionTwo.percentage}%</span>
                            </p>
                        }
                    </div>
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