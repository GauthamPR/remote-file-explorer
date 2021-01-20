import React from 'react';

class LocationTile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            location: props.url.split('/')
        }
    }

    render(){
        const style = {
            backgroundColor :"red",
            width           : "100%",
            height          : "100%",
            display         : "grid",
            placeItems      : "center"
        }
        return(
            <div style={style}>{this.state.location.join('>')}</div>
        )
    }
}
class Navbar extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const style = {
            backgroundColor : "#233a6e",
            height          : 40,
            display         : "flex",
            justifyContent  : "space-between"
        }
        return(
            <nav style={style}>
                <div style={{backgroundColor:"green", width: 50, height: "100%"}}></div>
                <LocationTile url={this.props.url}/>
                <div style={{backgroundColor:"yellow", width: 50, height: "100%"}}></div>
            </nav>
        )
    }
}

export default Navbar;