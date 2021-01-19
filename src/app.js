import React from 'react';
import Navbar from './js/components/navbar.js';

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Navbar />
                <p>Hello World!</p>
            </div>
        );
    }
}

export default App;