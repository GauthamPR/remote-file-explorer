import React from 'react';

class AddressBar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const style = {
            color           : "white",
            width           : "100%",
            height          : "100%",
            display         : "grid",
            placeItems      : "center",
            fontSize        : 18
        }
        return(
            <div style={style}>{[...this.props.tree, this.props.currentDirectory].join('<')}</div>
        )
    }
}

const styleBackButton = {
    display: "grid",
    placeItems: "center",
    backgroundColor: "rgb(50, 130, 149)",
    width: 100,
    border: "none"
}

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }
    
    handleMouseEnter(event){
        event.target.style.backgroundColor  = "white";
        event.target.style.cursor           = "pointer";
    }

    handleMouseOut(event){
        event.target.style.backgroundColor = styleBackButton.backgroundColor;
    }

    render(){
        const style = {
            backgroundColor : "#233a6e",
            height          : 40,
            display         : "flex",
            justifyContent  : "space-between",
            borderBottom    : "3px solid orange"
        }
        return(
            <nav style={style}>
                <button
                    type="button"
                    onClick={this.props.goBack}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOut={this.handleMouseOut}
                    style={styleBackButton}
                >
                    back
                </button>
                <AddressBar tree={this.props.tree} currentDirectory={this.props.currentDirectory}/>
                <div style={{backgroundColor:"yellow", width: 50, height: "100%"}}></div>
            </nav>
        )
    }
}

export default Navbar;