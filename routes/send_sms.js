const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

client.messages.create({
    body: '',
    from: '++15162724904',
    to: ''
}).then(message => console.log(message.sid));
