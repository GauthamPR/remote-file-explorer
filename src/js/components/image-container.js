import React from 'react';
import LazyLoad from 'react-lazyload';

const styleContainer = {
    display             : "grid",
    gridTemplateColumns : "repeat(auto-fill, minmax(250px, 1fr))" ,
    gap           : "50px"
}

class Images extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
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
            <LazyLoad key={this.props.index} once offset={500} >
                {this.state.loading && <div style={{backgroundColor: "white", height: "100%", width:"100%", position: "absolute", display: "grid", placeItems: "center"}}>Loading</div>}
                <img onLoad={this.handleLoad} src={this.props.imgUrl}></img>
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
                <div style={styleContainer}>
                    {images}
                </div>
            </section>
        )
    }
}

export default ImageContainer;