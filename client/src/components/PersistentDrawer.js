import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CallMade from '@material-ui/icons/CallMade'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
// import Button from '@material-ui/core/Button';
import LogoutIcon from '@material-ui/icons/RemoveCircleOutline';

import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import Reactions from "./Reactions.jsx";
import Article from "./Article.jsx";
import "./drawer.css";
import SignIn from "../pages/SignIn.js";

// import Input from "../components/Input.js";

const drawerWidth = 300;



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

class PersistentDrawer extends React.Component {
    constructor(props) {
        super(props);


        fetch('/api/currentarticle')
        .then(response => response.json())
        .then(myJson => {
            this.setState({ currentArticleId: myJson._id });
            console.log("currentArticleId", myJson._id);
        })
        .catch(err => console.log(err))


        this.state = {
            open: false,
            left: false,
            anchor: 'right',
            article_id: [],

            articleText: "",
            currentArticleId: "",
            regusername: "",
            logusername: "",
            regpssw: "",
            logpssw: "",
            conpssw: "",
            email: "",
            chat: "",
            user: {},
            error: "",
            loggedIn: false,

        };
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleUser = (userData) => {
        this.setState({ "user": userData, "loggedIn": true });
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
    }


/////////////////////////////////////////////////////////////////////////////////////////////////////


    componentDidMount() {

        Promise.all([
            fetch('/api/currentarticle').then(response => response.json()),
            fetch('/api/user').then(response => response.json())
        ]).then(data => {
            // console.log(data[1].user);
            if (data[1].user) {
                this.setState({
                    user: data[1],
                    loggedIn: true,
                    currentArticleId: data[0]._id,
                })
            }
            
        })
    }

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

    render() {

        const { classes } = this.props;
        const { anchor, open, currentArticleId} = this.state;

        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <CallMade />
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <div>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Send mail" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </div>


                </List>
                <Divider />
                <List>


                    <div>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Send mail" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </div>

                </List>
            </Drawer>
        );


        const home = (
            <div className={classes.root}>

                <div className={classes.appFrame}>

                    <Drawer open={this.state.left} onClose={this.toggleDrawer()}>
                       

        {/* Logout Button */}
                        <ListItem button onClick={this.handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                        

                        <ListItem button>
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="All mail" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Spam" />
                        </ListItem>

                    </Drawer>

                    <main
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >

                        <MenuIcon style={{ position: "absolute", top: "50px", right: "20px" }} onClick={this.handleDrawerOpen} />
                        <MenuIcon style={{ position: "absolute", top: "50px", left: "20px" }} onClick={this.toggleDrawer()} />
                        <div id="scrollDiv" style={{width: "100%", height: "100%", overflow: "scroll"}}>
                        
                            <Article article={currentArticleId}/>
                            {this.state.loggedIn ? <Reactions article={currentArticleId}/> : ""}
                            {/* {this.props.children} */}

                        </div>
                    </main>

                    {drawer}
                </div>
            </div>
        );

        if (!this.state.loggedIn) {
            return <SignIn handleUser={this.handleUser} />;
        } else {
            return home;
        }
    }         
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);