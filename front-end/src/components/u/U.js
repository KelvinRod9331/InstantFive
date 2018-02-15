import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Member from './Member';

class U extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/u/:member' component={Member}/>
            </Switch>
        )
    }
}

export default U;