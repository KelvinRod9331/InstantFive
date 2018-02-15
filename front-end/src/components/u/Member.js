import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

class Member extends React.Component {
    render() {
        console.log(this.props.match.params.member)
        return (
            <div>{'Username: ' + this.props.match.params.member}</div>
        )
    }
}

export default Member;