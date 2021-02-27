import React from 'react';

class HidingButton extends React.Component{
    constructor(props){
        super(props);
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    changeVisibility(){
        this.props.changeContainerVisibility();
        if(this.props.containerHidden)
            document.getElementById(this.props.btnName).style = "color: white;transform: rotate(0deg)";
        else
            document.getElementById(this.props.btnName).style = "color: red;transform: rotate(180deg)";
    }

    render(){
        return(
            <button
                type="button"
                style={{
                    backgroundColor : "transparent",
                    border          : "none",
                    cursor          : "pointer"
                }}
                onClick={this.changeVisibility}>
                    <i id={this.props.btnName} className="fas fa-chevron-circle-down fa-2x"></i>
            </button>
        )
    }
}

export default HidingButton;