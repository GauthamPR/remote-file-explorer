import React from 'react';
import DirectoryContainer from './directory-container.js';
import ImageContainer from './image-container.js';

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main style={{margin: 20}}>
                <DirectoryContainer openDirectory={this.props.openDirectory} directories={this.props.content.directories}/>
                <ImageContainer images={this.props.content.images} />
            </main>
        )
    }
}

export default Main;