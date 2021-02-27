import React from 'react';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Presentational from './app.js'

const OPEN_DIRECTORY    = "OPEN_DIRECTORY";
const GO_BACK           = "GO_BACK";
const LOAD_CONTENT      = "LOAD_CONTENT";
const SET_ADDRESS       = "SET_ADDRESS";

const defaultState = {
    currentDirectory: process.env.ROOT_DIRECTORY.split('\\').pop(),
    tree            : [],
    content         : {},
    loading         : true
}

function pathReducer(state=defaultState, action){
    switch(action.type){
        case OPEN_DIRECTORY :   return Object.assign({}, state, {
                                    tree            : [...state.tree, state.currentDirectory],
                                    currentDirectory: action.currentDirectory,
                                    loading         : true
                                });
        case SET_ADDRESS :   return Object.assign({}, state, {
                                    tree            : action.address.split('/').slice(0, action.address.split('/').length-1),
                                    currentDirectory: action.address.split('/')[action.address.split('/').length-1],
                                    loading         : true
                                })
        case GO_BACK        :   return Object.assign({}, state, {
                                    tree            : state.tree.slice(0, state.tree.length-1),
                                    currentDirectory: state.tree.length>0?state.tree[state.tree.length-1]:state.currentDirectory,
                                    loading         : true
                                });
        case LOAD_CONTENT   :   return Object.assign({}, state, {content: action.content, loading: false})
        default             :   return state
    }
}

function openDirectory(directory){
    return {
        type            : OPEN_DIRECTORY,
        currentDirectory: directory
    }
}

function setAddress(address){
    return {
        type    : SET_ADDRESS,
        address : address
    }
}

function goBack(){
    return{
        type: GO_BACK
    }
}

function loadContent(content){
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
            sessionStorage.setItem('path', sessionStorage.getItem('path')+'/'+directory);
            dispatch(openDirectory(directory))
        },
        setAddress: function(address){
            sessionStorage.setItem('path', address);
            dispatch(setAddress(address))
        },
        goBack: function(){
            dispatch(goBack())
        },
        loadContent: function(content){
            dispatch(loadContent(content))
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