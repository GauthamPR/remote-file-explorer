import React from 'react';
import LazyLoad from 'react-lazyload';
import HidingButton from './hidingButton.js';

const styleContainer = {
    display             : "grid",
    gridTemplateColumns : "repeat(auto-fit, minmax(250px, 1fr))",
    gap                 : "10px"
}
const altStyleContainer = {
    columnCount : "5",
    lineHeight  : "0",
    gap         : "5px"
}
const styleImg = {
    height      : "300px",
    width       : "100%",
    objectFit   : "contain"
}
const altStyleImg = {
    width: "100%"
}
class Images extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <LazyLoad key={this.props.index}>
                <img style={styleImg} src={this.props.imgUrl}></img>
            </LazyLoad>
        )
    }
}
class ImageContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hidden: false
        }
        this.changeVisibility = this.changeVisibility.bind(this);
    }

    changeVisibility(){
        this.setState(state=>({
            hidden: !state.hidden
        }))
    }

    render(){
        let images = [];
        if(this.props.images)
            images = this.props.images.map((img, index)=>{
                let imgUrl = '/getImages/' + this.props.path + '/' + img
                return(<Images key={index} index={index} imgUrl={imgUrl} />)
            })
        return(
            <section>
                <h1 className="section-header">
                    <span>Images</span>
                    <HidingButton
                        containerHidden={this.state.hidden}
                        btnName={"images-hide-btn"}
                        changeContainerVisibility={this.changeVisibility}
                    ></HidingButton>
                </h1>
                {this.props.images.length > 0?
                    <div style={this.state.hidden?{display: "none"}:styleContainer}>
                        {images}
                    </div>
                 :
                 <div className="empty-placeholder">No images</div>
                }
            </section>
        )
    }
}

export default ImageContainer;