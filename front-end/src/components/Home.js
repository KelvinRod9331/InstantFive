import React from 'react';
import { Redirect } from 'react-router';

class Home extends React.Component{
    render() {
        return <Redirect to="/registration" />;
        return(
            <div>
                Hello
            </div>
    
        )
    }
    

}

export default Home;