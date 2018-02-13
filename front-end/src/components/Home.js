import React from 'react';
import { Redirect } from 'react-router';

class Home extends React.Component{
    render() {
        return <Redirect to="/Registration" />;
        return(
            <div>
                Hello
            </div>
    
        )
    }
    

}

export default Home;