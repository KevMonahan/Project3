import React, { Component } from "react";
import Input from "../components/Input.js";
import './simple.css';





class Simple extends Component {
    constructor(props){
        super(props);

        this.state = {

            articleText: "",
            articleId: "",
            regusername:"",
            logusername: "",
            regpssw: "",
            logpssw: "",
            conpssw: "",
            email:"",
            chat: "",
            user: {},
            error: "",
            loggedIn: false
        }
    }

     // JS functions goes here

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleLogin = event => {
        event.preventDefault();

        let formData = {
            "username": this.state.logusername,
            "password": this.state.logpssw,
        };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.json();
        }).then((myJSON) => {
            console.log(JSON.stringify(myJSON));
            if (myJSON.success) {
                this.setState({"user": myJSON.user, "loggedIn": true });
            } else {

            }
        }).catch((reason) => {
            this.setState({"error": "Username or password incorrect!"});
        });

        // API.search(this.state.searchTerm, this.state.startYear, this.state.endYear)
        //     .then(res => {
        //         this.setState({ results: res.data.response.docs }); console.log(this.state);
        //     })
        //     // .then(console.log(this.state.results))
        //     .catch(err => console.log(err));
    };

    handleRegister = event => {
        event.preventDefault();


        if (this.state.regpssw !== this.state.conpssw){
            console.log("passwords must match");
            return;
        }
        
        else{

        let formData = {
            "username": this.state.regusername,
            "password": this.state.regpssw,
            "email": this.state.email
        };


        console.log(formData);

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.json();
        }).then((myJSON) => {
            console.log(JSON.stringify(myJSON))
            if (!myJSON.error) {
                this.setState({"user": myJSON.user, "loggedIn": true});
            } else {
                this.setState({"error": myJSON.error})
            }
            
        });
    }
    };


    handleChat = event => {
        event.preventDefault();

        let formData = {
            chat: this.state.chat
        };

        console.log(formData);

        fetch('/api/chat', {
            method: 'POST',
            body: formData,
        });

        this.setState({chat: ""})
    };


    render () {
 
    const loginPage = (
        <nav className = "flexy">

        <div className="half">
        <form onSubmit={this.handleLogin}>

            login - 
                    
            <label htmlFor="logusername">Username:</label>
            <Input
                title={"username:"}
                value={this.state.username}
                id={"logusername"}
                name={"logusername"}
                onChange={this.handleInputChange}
                for={"login"}
            />

            <label htmlFor="logpssw">Password</label>
            <Input
                className={"input"}
                title={"password:"}
                value={this.state.password}
                id={"logpssw"}
                name={"logpssw"}
                onChange={this.handleInputChange}
                for={"login"}
            />

            <button
                className={"input"}
                onClick={this.handleFormSubmit}
                type="submit"
                id="run-search">
                Search
            </button>

        </form>
        </div>

        <div className="half">
        <form onSubmit={this.handleRegister}>

            register -
            <br></br>
        <p>{this.state.error}</p>     
        <label htmlFor="regusername">Username:</label>
            <Input
                className = {"input"}
                // title={"username:"}
                value={this.state.username}
                id={"regusername"}
                name={"regusername"}
                onChange={this.handleInputChange}
                for={"login"}
            />
        <label htmlFor="regpssw">Password</label>
            <Input
                className={"input"}
                // title={"password:"}
                value={this.state.password}
                id={"regpssw"}
                name={"regpssw"}
                onChange={this.handleInputChange}
                for={"login"}
            />
        <label htmlFor="conpssw">Confirm Password</label>
            <Input
                className={"input"}
                // title={"confirm password:"}
                value={this.state.conpassword}
                id={"conpssw"}
                name={"conpssw"}
                onChange={this.handleInputChange}
                for={"login"}
            />
        <label htmlFor="email">Email</label>
            <Input
                className={"input"}
                // title={"confirm password:"}
                value={this.state.email}
                id={"email"}
                name={"email"}
                onChange={this.handleInputChange}
                for={"login"}
            />
            <button
                className={"input"}
                // onClick={this.handleFormSubmit}
                type="submit"
                id="run-search">
                Search
            </button>
            </form>

        </div>

        </nav>
);

const homePage = (
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
        
            <form onSubmit={this.handleChat}>

                <p id="chattext">Chat text here</p>

                        <br></br>

                {/* <textarea name="chat" id="chatinput" cols="30" rows="10"></textarea> */}

                        <label htmlFor="chat">Chat Input</label>
                        <textarea name="chat" id="chatinput" value={this.state.chat} onChange={this.handleInputChange} />

                        <br></br>

                <button id="chatsubmit">Submit</button>
            </form>

        </div>

    </div>

        {this.props.children}

    </React.Fragment>);
        if (this.state.loggedIn) {
            return homePage;
        } else {
            return loginPage;
        }

    }

};

export default Simple;