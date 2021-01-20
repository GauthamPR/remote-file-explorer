import React from 'react';
import DirectoryContainer from './directory-container.js';

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main style={{margin: 20}}>
                <DirectoryContainer openDirectory={this.props.openDirectory} directories={this.props.contents.directories}/>
            </main>
        )
    }
}

export default Main;