import React from 'react';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Presentational from './app.js'

const OPEN_DIRECTORY    = "OPEN_DIRECTORY";
const SET_CONTENTS      = "SET_CONTENTS";

const defaultState = {
    currentDirectory: process.env.ROOT_DIRECTORY.split('\\').pop(),
    tree: '',
    contents: {}
}

function pathReducer(state=defaultState, action){
    switch(action.type){
        case OPEN_DIRECTORY : return Object.assign({}, state, {tree: state.tree + '/' + state.currentDirectory, currentDirectory: action.directory})
                              break;
        case SET_CONTENTS   : return Object.assign({}, state, {contents: action.contents})
                              break;
        default             : return state
    }
}

function openDirectory(directory){
    return {
        type: OPEN_DIRECTORY,
        directory
    }
}

function setContents(contents){
    return{
        type: SET_CONTENTS,
        contents
    }
}

function mapStateToProps(state){
    return {
        currentDirectory    : state.currentDirectory,
        tree                : state.tree,
        contents            : state.contents
    }
}

function mapDispatchToProps(dispatch){
    return{
        openDirectory: function(directory){
            dispatch(openDirectory(directory))
        },
        setContents: function(contents){
            dispatch(setContents(contents))
        }
    }
}

const store = createStore(pathReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Container />
            </Provider>
        )
    }
}

export default AppWrapper;