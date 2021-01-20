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
            <div style={style}>{[...this.props.tree.split('/'), this.props.currentDirectory].filter(elem=>elem!="").join('<')}</div>
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
            justifyContent  : "space-between",
            borderBottom    : "3px solid orange"
        }
        return(
            <nav style={style}>
                <div
                    onClick={this.props.goBack}
                    style={{display: "grid", placeItems: "center", backgroundColor: "rgb(50, 130, 149)", width: 100}}
                >
                    back
                </div>
                <AddressBar tree={this.props.tree} currentDirectory={this.props.currentDirectory}/>
                <div style={{backgroundColor:"yellow", width: 50, height: "100%"}}></div>
            </nav>
        )
    }
}

export default Navbar;