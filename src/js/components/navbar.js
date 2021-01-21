import React from 'react';

const styleNav = {
    backgroundColor : "#233a6e",
    height          : 40,
    display         : "flex",
    justifyContent  : "space-between",
    borderBottom    : "3px solid orange",
    fontFamily      : "inherit"
}
const styleAddress = {
    color           : "white",
    width           : "100%",
    height          : "100%",
    display         : "flex",
    alignItems      : "center",
    justifyContent  : "center",
    fontSize        : 18
}
const styleBackButton = {
    display         : "grid",
    placeItems      : "center",
    backgroundColor : "rgb(50, 130, 149)",
    border          : "none"
}

class AddressBar extends React.Component{
    constructor(props){
        super(props)
        this.handleClick        = this.handleClick.bind(this);
        this.handleMouseEnter   = this.handleMouseEnter.bind(this);
        this.handleMouseOut     = this.handleMouseOut.bind(this);
    }
    handleClick(address){
        this.props.setAddress(address)
    }
    handleMouseEnter(event){
        event.target.style.opacity      = "1";
        event.target.style.borderBottom = "1px solid orange"
    }
    handleMouseOut(event){
        event.target.style.opacity      = "0.6";
        event.target.style.borderBottom = "none";
    }
    render(){
        const historyElements = this.props.tree.map((elem, index, array)=>{
            return (
                <React.Fragment key={index}>
                    <div 
                        style={{
                            cursor      : "pointer",
                            opacity     : "0.6",
                            whiteSpace  : "nowrap"
                        }}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseOut={this.handleMouseOut}
                        onClick={this.handleClick.bind(this, array.slice(0, index+1).join('/'))}
                    >
                        {elem}
                    </div>
                    <div>></div>
                </React.Fragment>
            )
        })
        return(
            <div style={styleAddress}>{historyElements}<span style={{whiteSpace: "nowrap"}}>{this.props.currentDirectory}</span></div>
        )
    }
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
        return(
            <nav style={styleNav}>
                <button
                    type="button"
                    onClick={this.props.goBack}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOut={this.handleMouseOut}
                    style={styleBackButton}
                >
                    Go Back
                </button>
                <AddressBar setAddress={this.props.setAddress} tree={this.props.tree} currentDirectory={this.props.currentDirectory}/>
                <div style={{backgroundColor:"yellow", width: 50, height: "100%"}}></div>
            </nav>
        )
    }
}

export default Navbar;