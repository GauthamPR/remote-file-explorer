module.exports={
    saveLocationInSession: function(){
        sessionStorage.setItem('path', address);
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