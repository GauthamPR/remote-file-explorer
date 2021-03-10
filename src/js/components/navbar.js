import React from 'react';
import addressServices from '../addressServices';
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
    width           : "auto",
    height          : "100%",
    display         : "flex",
    alignItems      : "center",
    textAlign       : "center",
    overflow        : "auto",
    fontSize        : 18,
    margin          : "0 10px"
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
        this.props.setAddress(address);
    }
    handleMouseEnter(event){
        event.target.style.opacity      = "1";
        event.target.style.borderBottom = "1px solid orange"
    }
    handleMouseOut(event){
        event.target.style.opacity      = "0.6";
        event.target.style.borderBottom = "none";
    }
    componentDidUpdate(prevProps){
        if(prevProps.tree!=this.props.tree || prevProps.currentDirectory!=this.props.currentDirectory){
            addressServices.pushHistory(this.props);
            addressServices.saveLocationInSession(this.props);
        }
    }
    render(){
        const arrow = ">"
        const historyElements = this.props.tree.map((elem, index, arr)=>{
            return (
                <React.Fragment key={index}>
                    <span 
                        style={{
                            cursor      : "pointer",
                            opacity     : "0.6",
                            whiteSpace  : "nowrap"
                        }}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseOut={this.handleMouseOut}
                        onClick={this.handleClick.bind(this, arr.slice(0, index+1).join('/'))}
                    >
                        {elem}
                    </span>
                    <span>{arrow}</span>
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
                    id="back-btn"
                    type="button"
                    aria-label="back"
                    onClick={this.props.goBack}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseOut={this.handleMouseOut}
                    style={styleBackButton}
                >
                    <i className="fas fa-arrow-left fa-2x" aria-hidden="true"></i>
                </button>
                <AddressBar setAddress={this.props.setAddress} tree={this.props.tree} currentDirectory={this.props.currentDirectory}/>
                <div style={{backgroundColor:"yellow", width: 50, height: "100%"}}></div>
            </nav>
        )
    }
}

export default Navbar;