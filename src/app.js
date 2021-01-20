import React from 'react';
import Navbar from './js/components/navbar.js';
import Main from './js/components/main.js';

const root = "/" + process.env.ROOT_DIRECTORY.split('\\').pop()

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            url: root,
            contents: {}
        }
        this.getDirectoryContents = this.getDirectoryContents.bind(this);
    }

    getDirectoryContents(){
        fetch('/getDirectory' + this.state.url)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                contents: data
            })
        })
    }

    componentDidMount(){
        this.getDirectoryContents();    
    }

    render(){
        return(
            <div>
                <Navbar url={this.state.url}/>
                <Main contents={this.state.contents}/>
            </div>
        );
    }
}

export default App;