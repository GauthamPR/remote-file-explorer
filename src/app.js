import React from 'react';
import Navbar from './js/components/navbar.js';
import Main from './js/components/main.js';

class App extends React.Component{
    constructor(props){
        super(props)
        this.getDirectoryContents = this.getDirectoryContents.bind(this);
    }

    getDirectoryContents(){
        fetch('/getDirectory' + this.props.tree + '/' + this.props.currentDirectory)
        .then(response=>response.json())
        .then(data=>{
            this.props.setContents(data)
        })
    }
    componentDidMount(){
        this.getDirectoryContents();
    }
    componentDidUpdate(prevProps){
        if(prevProps.currentDirectory != this.props.currentDirectory || prevProps.tree != this.props.tree)
            this.getDirectoryContents();
    }
    render(){
        return(
            <div>
                <Navbar tree={this.props.tree} currentDirectory={this.props.currentDirectory}/>
                <Main openDirectory={this.props.openDirectory} contents={this.props.contents}/>
            </div>
        );
    }
}

export default App;