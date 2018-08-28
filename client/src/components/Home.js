import React from 'react';
import io from 'socket.io-client';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import "./drawer.css";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';

import Reactions from "./Reactions.jsx";
import Article from "./Article.jsx";
import SignIn from "../pages/SignIn.js";

import IconButton from '@material-ui/core/IconButton';
import Sort from '@material-ui/icons/Sort';
import CallMade from '@material-ui/icons/CallMade';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogoutIcon from '@material-ui/icons/RemoveCircleOutline';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';








const drawerWidth = 300;

const socket = io();

function switchRoom(room) {
    socket.emit('switchRoom', room);
}

function sendMessage(message){
    socket.emit('message', message);
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },

    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        overflowX: "hidden"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        fetch('/api/currentarticle')
            .then(response => response.json())
            .then(myJson => {
                this.setState({ currentArticleId: myJson._id });
                console.log("currentArticleId", myJson._id);
            })
            .catch(err => console.log(err))
            
        socket.on("newMessage", this.something);

        this.state = {
            open: false,
            left: false,
            anchor: 'right',

            article_id: [],
            articleText: "",

            currentArticleId: "",
            articleNumber: "",

            regusername: "",
            logusername: "",
            regpssw: "",
            logpssw: "",
            conpssw: "",
            email: "",

            user: {},
            loggedIn: false,

            message: "",
            messagesArray: [],

            wantsDiscussion: true,
            reactionLine: "",
            reacted: false,

            forceUpdate: "value",

            chat: "",

            discussionId: "",

            error: "",

        };
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////


    
    componentDidMount() {

        Promise.all([
            fetch('/api/currentarticle').then(response => response.json()),
            fetch('/api/user').then(response => response.json())
           

        ]).then(data => {
            if (data[1].user) {
                this.setState({
                    user: data[1].user,
                    loggedIn: true,
                    currentArticleId: data[0]._id,
                })

            // console.log(data[1].user.articles.indexOf(this.state.currentArticleId))
            if (data[1].user.articles.indexOf(this.state.currentArticleId) !== -1){
                this.setState({
                    reacted: true,
                })
            }
                
                //Get route to see if a user has a discussion on load

                console.log("current UserId", this.state.user._id)

                fetch(`/api/discussion/${this.state.currentArticleId}/${this.state.user._id}`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then((myJson) => {

                        if(myJson){

                        console.log(myJson);

                        if(myJson){

                        this.setState(
                            {
                                discussionId: myJson._id,
                                // reacted: true,
                                // message: "",
                                messagesArray: [...myJson.messages]
                            }
                        );

                        switchRoom(myJson._id);
                
                    } else{
                            this.setState(
                                {
                                    reacted: false,
                                }
                            );
                    }
                }

                    }).catch((error) => {
                        console.log(error)
                        // this.setState({ "user": null, "loggedIn": false });
                    });

            }
            // console.log("user", this.state.user)
        })
    }

    something = (message)=> {
    this.handleSync()
    console.log("message", message)
}

    handleLogout = () => {

        fetch('/api/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ "user": null, "loggedIn": false });
        }).catch((error) => {
            this.setState({ "user": null, "loggedIn": false });
        });

        window.location.reload();

    }

    handleRefresh = () => {
        window.location.reload();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleToggle = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleUser = (userData) => {
        this.setState({ "user": userData, "loggedIn": true });

        // console.log(userData);
        if (userData.articles.indexOf(this.state.currentArticleId) !== -1) {
            this.setState({
                reacted: true,
            })
        }

    }

    handleReaction = (event) => {

        event.preventDefault();

        // console.log(this.state.user._id)
        // console.log(this.state.currentArticleId)

        let articlesData = {
            _id: this.state.user._id,
            articles: this.state.currentArticleId
        };

        // console.log(articlesData);

        fetch('/api/users/' + this.state.user._id, {
            method: 'Put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articlesData)
        }).then((response) => {
            return response.json();
        }).then((myJSON) => {
            // console.log(myJSON);
            if (myJSON) {

                this.setState(
                    {
                        // user: [...this.state.messagesArray, myJSON.messages[myJSON.messages.length - 1]]
                        forceUpdate: Math.random(),
                        reacted: true,
                    }
                );
            } else {
                this.setState(
                    {
                        message: "error"
                    }
                );
            }
        }).catch((reason) => {
            console.log(reason)
        });


        let reactionData = {
            _userId: this.state.user._id,
            _articleId: this.state.currentArticleId,
            wants_discussion: this.state.wantsDiscussion,
            initial_opinion: this.state.reactionLine
        };

        // console.log(reactionData);


        //???????????????????????????????????????
        fetch('/api/reactions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reactionData)
        }).then((response) => {
            return response.json();
        }).then((myJSON) => {
            console.log(myJSON);
            if (myJSON) {

                this.setState(
                    {
                        // user: [...this.state.messagesArray, myJSON.messages[myJSON.messages.length - 1]]
                    }
                );
            } else {
                this.setState(
                    {
                        // message: "error"
                    }
                );
            }
        }).catch((reason) => {
            this.setState({ "error": "Username or password incorrect!" });
        });
    }


    handleSync = () => {
        console.log("test")

        fetch('/api/messages/' + this.state.discussionId)
            .then(function (response) {
                return response.json();
            })
            .then((myJson)=> {
                
                console.log(myJson[0]);

                this.setState(
                    {
                        // message: "",
                        messagesArray: [...this.state.messagesArray, myJson[0].messages[myJson[0].messages.length-1]] 
                    }
                );
            });
    }

    handleCreateChat = (value) => {
        console.log("value", value);

        if(value){

        let formData = {
            _articleId: this.state.currentArticleId,
            user_one: this.state.user._id,
            user_two: value, 
        };

        console.log(formData);

        fetch('/api/discussion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.json();
        }).then((myJSON) => {
            console.log("discussion response",myJSON);
            if (myJSON) {

                switchRoom(myJSON._id);

                this.setState(
                    {
                        discussionId: myJSON._id
                    }
                );
            }
        }).catch((reason) => {
            this.setState({ "error": "Username or password incorrect!" });
        });


            fetch(`/api/reactions/${this.state.user._id}/${value}`, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                return response.json();
            }).then((myJSON) => {
                console.log(myJSON);
                if (myJSON) {

                    this.setState(
                        {
                            forceUpdate: Math.random(),
                            // messagesArray: [...this.state.messagesArray, "Say hello!"] 
                        }
                    );
    
                } else {
                    this.setState(
                        {
                            message: "error"
                        }
                    );
                }
            }).catch((reason) => {
                console.log(reason);
            });      
        }
    
    }


    handleMessage = (event) => {

        event.preventDefault();

            // console.log(this.state.user._id)

            let formData = {
                _id: this.state.discussionId,
                messages:  this.state.user.username + ": " + this.state.message
            };

            console.log(formData);

            fetch('/api/discussion/' + this.state.discussionId, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then((response) => {
                return response.json();
            }).then((myJSON) => {
                console.log(myJSON);
                if (myJSON) {

                    this.setState(
                        {
                            message: "",
                            // messagesArray: [...this.state.messagesArray, myJSON.messages[myJSON.messages.length-1]] 
                        }
                    );

                    sendMessage("test")

                    console.log(this.state.messagesArray)
                } else {
                    this.setState(
                        {
                            message: "error"
                        }
                    );
                }
            }).catch((reason) => {
                console.log(reason)
            }); 
    }

    handlePastArticle = (articleId) => {

        console.log("inside handleSelectPastArticle", articleId);
        let currentVersion = this.state.articleNumber;
        currentVersion++;
        

        fetch(`/api/discussion/${articleId}/${this.state.user._id}`)
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {

                console.log("Past articles",myJson.messages);

                this.setState(
                    {

                        //add here

                        "currentArticleId": articleId,
                        "articleNumber": currentVersion,
                        discussionId: myJson._id,
                        reacted: true,
                        // message: "",
                        messagesArray: [...myJson.messages]
                    }
                );

                switchRoom(myJson._id);

            }).catch((error) => {
                console.log(error)
                // this.setState({ "user": null, "loggedIn": false });
            });
    }
    

////Drawer Methods/////////////////////////////////////////////////////////////////////////////////////


    handleDrawerOpen = () => {
        if (!this.state.open) {
            this.setState({ open: true });
        }
        else {
            this.setState({ open: false });
        }
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    toggleDrawer = () => () => {
        if (!this.state.left) {
            this.setState({ left: true });
        }
        else {
            this.setState({ left: false });
        }
    };

/////////////////////////////////////////////////////////////////////////////////////////////////////

    render() {

        const { classes } = this.props;
        const { anchor, open, currentArticleId, reacted, articleNumber, user} = this.state;

        const articlesMenu = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                style={{
                    overflowX: "hidden",
                    // overflowY: "auto",
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <CallMade />
                    </IconButton>
                </div>
                <Divider />

                {/* Chat Message Div */}
                <div id={"container"} style={{
                    height: "80%", overflow: "scroll",overflowX: "hidden",overflowY: "auto",}}>
                    <div style={{
                        height: "100%", overflow: "scroll", overflowX: "hidden", overflowY: "auto",
                    }}>

                    {/* {this.messagesArray.map((message) => {<ListItem>{message}</ListItem>})} */}
               
                    {this.state.messagesArray.map((value,index) => (
                        <React.Fragment>
                        <ListItem
                            key={index}
                            role={undefined}
                            // dense
                            button
                            style={{maxWidth: 290}}
                        >
                        <ListItemText style={{ maxWidth: 290 }} primary={`${value}`} />
                        </ListItem>
                        <Divider style={{ maxWidth: 290 }}/>
                        </React.Fragment>
                        )
                    )
                    
                    
                    }
                    </div>
        
        
                </div>
                
                <Divider />


                    <div>
                    {/* Chat send message */}

                    
                
                        <form className={classes.form} onSubmit={this.handleMessage}>
                          

                            <FormControl style={{maxWidth: 290}} margin="normal" required fullWidth>
                            <TextField
                                id="multiline-flexible"
                                label="Message"
                                multiline
                                rowsMax="4"
                                value={this.state.message}
                                onChange={this.handleChange('message')}
                                // className={classes.textField}
                                margin="normal"
                            />
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                label="submit"
                                className={classes.submit}
                                
                            >
                                Send Message
                               
                        </Button>
                        </form>



                    </div>

            </Drawer>
        );


        const chatDrawer = (
            <div className={classes.root} style={{overflowX: "hidden", overflowY: "hidden"}}>

                <div className={classes.appFrame}>

                    <Drawer open={this.state.left} onClose={this.toggleDrawer()} style={{overflowY: "hidden"}}>

                        <ListItem button onClick={this.handleRefresh}>
                            <ListItemText primary="Todays Article" />
                        </ListItem>
                       

            {/* All mail button to test sending a message */}
                        {/* <ListItem button onClick={this.handleMessage}>
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="All mail" />
                        </ListItem> */}

                    
            {/* Map of past articles should go here */}
            <div>
                {/* {console.log(this.state.user)} */}
                {(!this.state.loggedIn)
                ?<p>Placeholder</p>
                :this.state.user.articles.map((article, i) => {
                    return (<ListItem key={i} button onClick={() => { this.handlePastArticle(article); }}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={ i + 1} />
                    </ListItem>);
                })}
            </div>

                        {/* Logout Button */}
                        <ListItem button onClick={this.handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    
                    </Drawer>

                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >

                        <QuestionAnswer style={{ position: "absolute", top: "50px", right: "20px" }} onClick={this.handleDrawerOpen} />
                        <Sort style={{ position: "absolute", top: "50px", left: "20px" }} onClick={this.toggleDrawer()} />
                        <div id="scrollDiv" style={{width: "100%", height: "100%", overflow: "scroll"}}>
                        

            {/* The article */}
                            <Article reacted={reacted} article={currentArticleId} key={articleNumber}/>


            {/* Reactions */}
            
                            {/* {console.log("reacted", reacted)} */}
                            {this.state.reacted ?  

                            <Reactions
                            key={this.state.forceUpdate}
                            handleUser={this.handleCreateChat}
                            articleId={currentArticleId} 
                            inDiscussion={this.state.discussionId}
                            user={user}/>          

                             : "" }
                                                       
            {/* Post a reaction form */}

            {/* { !this.state.reacted ||  */}
            { !this.state.reacted &&
    
                            <form
                            className={classes.form}
                            onSubmit={this.handleReaction}
                            style={{maxWidth: 700, marginRight: "auto", marginLeft: "auto" }}>


                                <FormControl margin="normal" required fullWidth>
                                    <TextField
                                        id="multiline-flexible"
                                        label="Reaction"
                                        multiline
                                        rowsMax="4"
                                        value={this.state.reactionLine}
                                        onChange={this.handleChange('reactionLine')}
                                        // className={classes.textField}
                                        margin="normal"
                                    />
                                </FormControl>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.wantsDiscussion}
                                            onChange={this.handleToggle('wantsDiscussion')}
                                            value="wantsDiscussion"
                                            color="primary"
                                        />
                                    }
                                    label="Open for discussion?"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Post Reaction
                                </Button>
                            </form>

                            }
                            {/* {this.props.children} */}


                        </div>
                    </main>
               
                {articlesMenu}

                </div>
            </div>
        );


        // Sign In conditional
        if (!this.state.loggedIn) {
            return <SignIn handleUser={this.handleUser} />;
        } else {
            return chatDrawer;
        }
    }         
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);