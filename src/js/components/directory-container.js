import React from 'react';

class DirectoryContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.openDirectory(event.target.value);
    }

    render(){
        let directories = []
        const styleTile = {
            backgroundColor : "#C4C78D",
            textAlign       : "center",
            padding         : "17px 5px",
            width           : 175,
            border          : "1px solid black",
            boxShadow       : "5px 5px 7px #1f1e1e",
            borderRadius    : 5
        }
        if(this.props.directories)
            directories = this.props.directories.map((directory,index)=>{
                return (
                    <div key={index} style={{display: "grid", placeItems: "center"}}>
                        <button type="button" value={directory} onClick={this.handleClick} style={styleTile}key={index}>
                            {directory}
                        </button>
                    </div>
                )
            })
        const styleContainer = {
            display             :"grid",
            gridTemplateColumns :"repeat(auto-fit, minmax(150px, 1fr))",
            alignItems          : "center",
            gridGap             : "40px"
        }
        return(
            <section>
                <h1>Files</h1>
                <div style={styleContainer}>
                    {directories}
                </div>
            </section>
        )
    }
}

export default DirectoryContainer;