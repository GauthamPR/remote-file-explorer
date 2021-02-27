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
            this.props.loadContent(data)
        })
    }
    componentDidMount(){
        let sessionPath = sessionStorage.getItem('path');
        try{            
            if(sessionPath==null)
                sessionStorage.setItem('path', this.props.currentDirectory);
            if([...this.props.tree, this.props.currentDirectory].join!=sessionPath)
                throw "LOC_ERROR";
            this.getDirectoryContents();
        }catch(err){
            if(err=="LOC_ERROR")
                this.props.setAddress(sessionPath);
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.currentDirectory != this.props.currentDirectory || prevProps.tree != this.props.tree)
            this.getDirectoryContents();
    }
    render(){
        return(
            <div id="root" style={{fontFamily: "inherit"}}>
                <Navbar 
                    tree={this.props.tree}
                    currentDirectory={this.props.currentDirectory}
                    goBack={this.props.goBack}
                    setAddress={this.props.setAddress}
                />
                {this.props.loading ?
                    <Loading />:
                    <Main 
                        path={[...this.props.tree, this.props.currentDirectory].join('/')}
                        content={this.props.content}
                        openDirectory={this.props.openDirectory}
                    />
                }   
            </div>
        );
    }
}

export default App;