import React from 'react';
import LazyLoad from 'react-lazyload';

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
        this.state = {
            loading: false
        }
        this.handleLoad = this.handleLoad.bind(this);
    }

    handleLoad(){
        this.setState({
            loading: false
        })
    }

    render(){
        return(
            <LazyLoad key={this.props.index} once>
                <img style={styleImg} onLoad={this.handleLoad} src={this.props.imgUrl}></img>
            </LazyLoad>
        )
    }
}
class ImageContainer extends React.Component{
    constructor(props){
        super(props)
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
                <h1>Images</h1>
                {this.props.images.length > 0?
                    <div style={styleContainer}>
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