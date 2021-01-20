import React from 'react';
import Navbar from './js/components/navbar.js';
import Main from './js/components/main.js';

function Loading(){
    return (
        <h1>Loading....</h1>
    )
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.getDirectoryContents = this.getDirectoryContents.bind(this);
    }

    getDirectoryContents(){
        fetch('/getDirectory/' + [...this.props.tree, this.props.currentDirectory].join('/'))
        .then(response=>response.json())
        .then(data=>{
            this.props.setContent(data)
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
                <Navbar 
                    tree={this.props.tree}
                    currentDirectory={this.props.currentDirectory}
                    goBack={this.props.goBack}
                />
                {this.props.loading ?
                    <Loading />:
                    <Main 
                        content={this.props.content}
                        openDirectory={this.props.openDirectory}
                    />
                }   
            </div>
        );
    }
}

export default App;