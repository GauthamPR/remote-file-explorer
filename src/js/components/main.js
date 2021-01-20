import React from 'react';

class DirectoryContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let directories = []
        if(this.props.directories)
            directories = this.props.directories.map(directory=><div>{directory}</div>)
        return(
            <section>
                <h1>Files</h1>
                {directories}
            </section>
        )
    }
}

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main>
                <DirectoryContainer directories={this.props.contents.directories}/>
            </main>
        )
    }
}

export default Main;