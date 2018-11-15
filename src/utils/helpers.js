export const checkIfAnswered = (question, authedUser) => {
    return question.optionOne.votes.find((userId) => userId === authedUser)
        || question.optionTwo.votes.find((userId) => userId === authedUser)
            ? true
            : false;

};

export const getPollResults = (optionOneAnswers, optionTwoAnswers) => {
    let optionOnePercentage = 0,
        optionTwoPercentage = 0;

    if(optionOneAnswers + optionTwoAnswers > 0) {
        optionOnePercentage = Math.round((optionOneAnswers * 1000) / (optionOneAnswers + optionTwoAnswers)) / 10;
        optionTwoPercentage = Math.round((100 - optionOnePercentage) * 10) / 10;
    }


    return {
        optionOne: optionOnePercentage,
        optionTwo: optionTwoPercentage
    };
};

export const prepareQuestion = (question, authedUser) => {
    question.alreadyAnswered = checkIfAnswered(question, authedUser);

    const pollResults = getPollResults(question.optionOne.votes.length, question.optionTwo.votes.length);
    question.optionOne.percentage = pollResults.optionOne;
    question.optionTwo.percentage = pollResults.optionTwo;
    return question;
};