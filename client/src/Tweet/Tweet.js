import React from 'react'

export default (props) => (
    <div className="tweet_div">
        <p> {props.user_name}     @{props.screen_name} </p>
        <p> {props.text} <a href={props.link}> see more </a> </p>
    </div>



)