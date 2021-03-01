const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {

    const client = context.getTwilioClient();
    //console.log(event.taskSid);
    
        let responseBack = new Twilio.Response();
    responseBack.appendHeader('Access-Control-Allow-Origin', '*');
    responseBack.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
    responseBack.appendHeader('Content-Type', 'application/json');
    responseBack.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    client.conferences(event.taskSid).participants.create({
            to: "<<<number for IVR>>>",  // IVR phone number
            from: "<<<twilio verified number>>>",  // Inbound phone number
            earlyMedia: true,
            endConferenceOnExit: false
    }).then( res => {
        console.log(res);
        responseBack.setBody({
          "callSid":res.callSid,
    });
	    callback(null, responseBack);
    }).catch( e => {
        console.log(e);
        callback(null,responseBack);
    });
}
);
