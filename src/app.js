import React from 'react';
import Navbar from './js/components/navbar.js';

const root = process.env.ROOT_DIRECTORY.split('\\').pop()

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            url: root
        }
    }

    render(){
        return(
            <div>
                <Navbar url={this.state.url}/>
                <p>Hello World!</p>
            </div>
        );
    }
}

export default App;