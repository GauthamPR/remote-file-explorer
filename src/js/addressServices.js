module.exports={
    saveLocationInSession: function(props){
        sessionStorage.setItem('path', [...props.tree, props.currentDirectory].join('/'));
    },
    pushHistory: function(props){
        console.log(props.pushHistory);
        let newAddress = [window.location.hostname, ...props.tree, props.currentDirectory].join('/');
        if(newAddress != window.location && props.pushHistory){
            console.log("Pushing", newAddress);
            window.history.pushState(null, '', '//' + newAddress);
        }
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