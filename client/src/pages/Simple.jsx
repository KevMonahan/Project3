import React from "react";
import './simple.css';

const Simple = (props) => {

    // JS functions goes here






    //

    return (
    
    <React.Fragment>
    <div className="flexy">


        <div className = "third" >Menu

            <ul is="menu">
                <li>Article</li>
                <li>Chats</li>
                <li>Settings</li>
            </ul>

        </div>

        <div className = "third" >Article

            <p id="article"> Article stuff here</p>
        
        </div>

        <div className = "third" >
            Chat

            <p id="chattext">Chat text here</p>

                    <br></br>

            <textarea name="chat" id="chatinput" cols="30" rows="10"></textarea>

                    <br></br>

            <button id="chatsubmit">Submit</button>


        </div>

    </div>

        {props.children}

    </React.Fragment>)

};

export default Simple;