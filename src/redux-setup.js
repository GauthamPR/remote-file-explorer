import React from 'react';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Presentational from './app.js'

const OPEN_DIRECTORY    = "OPEN_DIRECTORY";
const GO_BACK           = "GO_BACK";
const LOAD_CONTENT     = "LOAD_CONTENT";

const defaultState = {
    currentDirectory: process.env.ROOT_DIRECTORY.split('\\').pop(),
    tree            : [],
    content        : {},
    loading         : true
}

function pathReducer(state=defaultState, action){
    switch(action.type){
        case OPEN_DIRECTORY :   return Object.assign({}, state, {
                                    tree: [...state.tree, state.currentDirectory],
                                    currentDirectory: action.directory,
                                    loading: true
                                });
        case GO_BACK        :   return Object.assign({}, state, {
                                    tree: state.tree.slice(0, state.tree.length-1),
                                    currentDirectory: state.tree.length>0?state.tree[state.tree.length-1]:state.currentDirectory,
                                    loading: true
                                });
        case LOAD_CONTENT  :   return Object.assign({}, state, {content: action.content, loading: false})
        default             :   return state
    }
}

function openDirectory(directory){
    return {
        type: OPEN_DIRECTORY,
        directory
    }
}

function goBack(){
    return{
        type : GO_BACK
    }
}

function setContent(content){
    return{
        type: LOAD_CONTENT,
        content
    }
}

function mapStateToProps(state){
    return {
        currentDirectory    : state.currentDirectory,
        tree                : state.tree,
        content             : state.content,
        loading             : state.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        openDirectory: function(directory){
            dispatch(openDirectory(directory))
        },
        goBack: function(){
            dispatch(goBack())
        },
        setContent: function(content){
            dispatch(setContent(content))
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