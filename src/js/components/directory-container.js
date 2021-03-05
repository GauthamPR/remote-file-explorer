import React from 'react';
import HidingButton from './hidingButton.js';

const styleTile = {
    backgroundColor : "#C4C78D",
    textAlign       : "center",
    padding         : "17px 5px",
    minWidth        : 175,
    border          : "1px solid black",
    boxShadow       : "5px 5px 7px #1f1e1e",
    borderRadius    : 5,
    cursor          : "pointer",
    overflowWrap    : "break-word",
    letterSpacing   : "0.1em",
    fontFamily      : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSize        : "16px"
}

const styleContainer = {
    display             :"grid",
    gridTemplateColumns :"repeat(auto-fill, minmax(250px, 1fr))",
    rowGap              : 30,
    justifyItems        : "center"
}

class DirectoryContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hidden: false
        }
        this.handleClick        = this.handleClick.bind(this);
        this.handleMouseEnter   = this.handleMouseEnter.bind(this);
        this.handleMouseOut     = this.handleMouseOut.bind(this);
        this.changeVisibility   = this.changeVisibility.bind(this);
    }

    handleMouseEnter(event){
        event.target.style.backgroundColor  = "#FBFF9F";
        event.target.style.boxShadow        = "3px 3px 5px black";
    }
    
    handleMouseOut(event){
        event.target.style.backgroundColor  = styleTile.backgroundColor;
        event.target.style.boxShadow        = styleTile.boxShadow;
    }

    handleClick(event){
        this.props.openDirectory(event.target.value);
    }

    changeVisibility(){
        this.setState(state=>({
            hidden: !state.hidden
        }))
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
                <h1 className="section-header">
                    <span>Files</span>
                    <HidingButton
                        containerHidden={this.state.hidden}
                        btnName={"directory-hide-btn"}
                        changeContainerVisibility={this.changeVisibility}
                    ></HidingButton>
                </h1>
                {this.props.directories.length > 0?
                    this.state.hidden?
                        <div></div>
                        :
                        <div style={styleContainer}>
                            {directories}
                        </div>
                    :
                    <div className="empty-placeholder">No Files</div>
                }
            </section>
        )
    }
}

export default DirectoryContainer;