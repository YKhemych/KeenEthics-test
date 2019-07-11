import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import Tweet from './Tweet/Tweet'

class App extends Component{

    state = {
        cars: []
    }

    searchTweets = () =>{
        let screenName = document.querySelector("#screenName").value;
        console.log(screenName);
        axios.get(`/${screenName}`)
            .then(response =>{
                this.setState({cars: response.data});
                // this.state.cars = response.data;
                // console.log(response.data[2].text);
                // console.log(response.data[2].user.name);
                // console.log(response.data[2])

            })
    }

    render() {
        return (
            <div>
                <div className="app">
                    <input id="screenName" type="text" className="input" placeholder="Screen name of the user" />
                    <button className="button" onClick={this.searchTweets}> Search </button>
                </div>
                <div className="tweets_div">
                    { this.state.cars.map( (tweet, index) =>{
                        if(tweet.retweeted_status) {tweet = tweet.retweeted_status;}
                        let tweetText = tweet.full_text.trim();
                        let tweetLink = tweetText.slice(tweetText.indexOf("http"), tweetText.length);
                            tweetText = tweetText.split('http')[0];
                            return (
                            <Tweet
                                key={index}
                                user_name={tweet.user.name}
                                screen_name={tweet.user.screen_name}
                                text={tweetText}
                                link={tweetLink}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default App;
