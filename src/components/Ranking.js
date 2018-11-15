import React, {Component} from 'react';
import {connect} from 'react-redux';

class Ranking extends Component {
    render() {
        console.log(this.props.users);
        return (
            <div>RANKING</div>
        );
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Ranking);