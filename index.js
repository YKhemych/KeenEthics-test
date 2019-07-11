const express = require('express');
var Twitter = require('twitter-js-client').Twitter;

const app = express();

app.use(express.static('client/build'))

var config = {
    "consumerKey": "cbUDPoK69MOv6IzNK6IEK3FCh",
    "consumerSecret": "QLMDxs4H0YbNMmHYRPSkiqWURKex7TIDtPFFHplH6wczI6MHQ7",
    "accessToken": "1148703274310262785-o7YiYQqXmj1qs0Y92K2dd1rRxSRR2z",
    "accessTokenSecret": "1e7c4LBRnc2mdTzFHnY3cq4KhtMiKoHekLemhll5S7KPH"
}

var twitter = new Twitter(config);

app.get('/:name', (req, res)=>{
    twitter.getUserTimeline({ screen_name: req.params.name, count: '15', tweet_mode: 'extended'},
        (err, response, body) => {
            console.log(`ERROR ${err}`);
        }, (data) => {
            res.json(JSON.parse(data));
        });
});


if(process.env.NODE_ENV == 'production'){
    const path = require('path');
    app.get('/*', (req, res) =>{
        res.sendfile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server has been started on ${port}`));

