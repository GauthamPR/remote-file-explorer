import React from 'react';

const styleTile = {
    backgroundColor : "#C4C78D",
    textAlign       : "center",
    padding         : "17px 5px",
    width           : 175,
    border          : "1px solid black",
    boxShadow       : "5px 5px 7px #1f1e1e",
    borderRadius    : 5,
    cursor          : "pointer"
}

const styleContainer = {
    display             :"grid",
    gridTemplateColumns :"repeat(auto-fill, minmax(250px, 1fr))",
    rowGap              : 40,
    justifyItems        : "center"
}

class DirectoryContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleClick        = this.handleClick.bind(this);
        this.handleMouseEnter   = this.handleMouseEnter.bind(this);
        this.handleMouseOut     = this.handleMouseOut.bind(this);
    }

    handleMouseEnter(event){
        event.target.style.backgroundColor  = "#FBFF9F";
        event.target.style.boxShadow        = "3px 3px 5px black";
    }
    
    handleMouseOut(event){
        event.target.style.backgroundColor  = styleTile.backgroundColor;
        event.target.style.boxShadow              = styleTile.boxShadow;
    }

    handleClick(event){
        this.props.openDirectory(event.target.value);
    }

    render(){
        let directories = []
        if(this.props.directories)
            directories = this.props.directories.map((directory,index)=>{
                return (
                        <button 
                            type="button" 
                            value={directory} 
                            onClick={this.handleClick}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseOut={this.handleMouseOut}
                            style={styleTile}key={index}
                        >
                            {directory}
                        </button>
                )
            })
        return(
            <section>
                <h1>Files</h1>
                <div style={styleContainer}>
                    {directories}
                </div>
            </section>
        )
    }
}

export default DirectoryContainer;