module.exports={
    saveLocationInSession: function(state){
        sessionStorage.setItem('path', [...state.tree, state.currentDirectory].join('/'));
    },
    pushHistory: function(state){
        let newAddress = [window.location.hostname, ...state.tree, state.currentDirectory].join('/');
        if(newAddress != window.location)
            window.history.pushState(null, '', '//' + newAddress);
    },
    restorePreviousLocation: function(props, getDirectoryContents){
        let sessionPath = sessionStorage.getItem('path');
        try{            
            if(sessionPath==null)
                sessionStorage.setItem('path', props.currentDirectory);
            else if([...props.tree, props.currentDirectory].join!=sessionPath)
                throw "LOC_ERROR";
            getDirectoryContents();
        }catch(err){
            if(err=="LOC_ERROR")
                props.setAddress(sessionPath);
            else
                console.error(err);
        }
    }
}