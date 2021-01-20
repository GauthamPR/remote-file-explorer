import React from 'react';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Presentational from './app.js'
import { sources } from 'webpack';
import { func } from 'prop-types';

const SET_ADDRESS   = "SET_ADDRESS";
const SET_CONTENTS  = "SET_CONTENTS";

const defaultState = {
    currentDirectory: process.env.ROOT_DIRECTORY.split('\\').pop(),
    tree: '',
    contents: {}
}

function pathReducer(state=defaultState, action){
    switch(action.type){
        case SET_ADDRESS    : return Object.assign({}, state, {tree: action.tree, currentDirectory: action.directory})
                              break;
        case SET_CONTENTS   : return Object.assign({}, state, {contents: action.contents})
                              break;
        default             : return state
    }
}

const store = createStore(pathReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function openDirectory(directory){
    return {
        type: SET_ADDRESS,
        tree: store.getState().tree + '/' + store.getState().currentDirectory,
        directory
    }
}

function goBack(){
    let state               = store.getState();
    let currentDirectory    = state.tree.splice(state.tree.length-2, 1);
    return{
        type            : SET_ADDRESS,
        tree            : state.tree,
        currentDirectory: currentDirectory
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
        goBack: function(){
            dispatch(goBack())
        },
        setContents: function(contents){
            dispatch(setContents(contents))
        }
    }
}

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