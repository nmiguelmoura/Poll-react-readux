import React from 'react';

const ListedQuestion = (props) => {
    const {question, user} = props;
    return (
        <div>
            <div>
                <p>{user.name}</p>
                <img src={user.avatarURL} alt={user.name}/>
            </div>
            <div>
                <div>
                    <p>{question.optionOne.text}</p>
                    {question.alreadyAnswered && <p>{question.optionOne.percentage}%</p>}
                </div>
                <div>
                    <p>{question.optionTwo.text}</p>
                    {question.alreadyAnswered && <p>{question.optionTwo.percentage}%</p>}
                </div>
            </div>
            <div>
                <button onClick={props.onPollClick}>View Poll</button>
            </div>
        </div>
    );
};

export default ListedQuestion;