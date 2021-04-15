//check comment created and then check
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    //if the commenat contains "orange", we reject it
    //else we emit an event
    const { type, data } = req.body;

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected': 'approved';  //content is the comment itself
        console.log('The status is ' + status );
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: { //we will probably need documentaion of each service to know what are the props present in this event.
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({}); //this needs to be done else the request handler hangs.
});

app.listen(4003, () =>{
    console.log('Listening on 4003');
});

