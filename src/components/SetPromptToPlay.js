export function setPromptToPlay(promptText) {
    return new Promise(function(resolve,reject) {

        console.log('SetPromptToPlay: promptText=',promptText);

        const body = { action: 'say', promptToSet:promptText };

        // Set up the HTTP options for your request
        const options = {method: 'POST', body: new URLSearchParams(body), headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}};

        // Make the network request using the Fetch API
        fetch(`${process.env.REACT_APP_WOZ_SERVER_BASE_URL}/setPrompt`, options)
        .then(resp => {
            return( resolve(resp.text()));
        })
        .catch(e  => {
            console.log(e);
            return(reject(e));
        });
    });
}
