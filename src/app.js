import React from 'react';
import Navbar from './js/components/navbar.js';
import Main from './js/components/main.js';

function Loading(){
    return (
        <h1>Loading....</h1>
    )
}
class ErrorScreen extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <h1>{this.props.err}</h1>
        )
    }
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
            if(data.error)
                this.props.setError(data.error);
            else
                this.props.loadContent(data)
        })
    }
    componentDidMount(){
        let sessionPath = sessionStorage.getItem('path');
        try{            
            if(sessionPath==null)
                sessionStorage.setItem('path', this.props.currentDirectory);
            else if([...this.props.tree, this.props.currentDirectory].join!=sessionPath)
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
                    !this.props.err?
                        <Main 
                            path={[...this.props.tree, this.props.currentDirectory].join('/')}
                            content={this.props.content}
                            openDirectory={this.props.openDirectory}
                        />:
                        <ErrorScreen 
                            err={this.props.err}
                        />
                }   
            </div>
        );
    }
}

export default App;