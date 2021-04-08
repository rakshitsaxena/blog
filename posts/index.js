const express = require('express');
const bodyParser = require('body-parser'); //helps for req to
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) =>{
    console.log('Received Event', req.body.type);
    res.send({});
});

app.post('/posts', async (req,res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };
    
    //emit event
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Listening on 4000');
})