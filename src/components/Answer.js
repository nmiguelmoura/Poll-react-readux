import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from "./Answer.module.css";

const Answer = (props) => {
    return(
        <div className={styles.answer}>
            <p>{props.text}</p>
            {props.alreadyAnswered &&
            <Fragment>
                {props.avatarUrl && <img src={props.avatarUrl} alt={props.text}/>}
                <p className={styles.result}>
                    <span className={styles['result-inner']} style={{'width': `${props.percentage}%`}}>{props.percentage}%</span>
                </p>
            </Fragment>
            }
        </div>
    );
};

Answer.propTypes = {
    text: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    alreadyAnswered: PropTypes.bool,
    avatarUrl: PropTypes.string
};

export default Answer;