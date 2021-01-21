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
                {this.props.content.empty ?
                    <div className="empty-placeholder">Empty Folder</div>
                 :
                 <React.Fragment>
                    <DirectoryContainer openDirectory={this.props.openDirectory} directories={this.props.content.directories}/>
                    <ImageContainer path={this.props.path} images={this.props.content.images} />
                </React.Fragment>
                }
            </main>
        )
    }
}

export default Main;