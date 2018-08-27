import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import AddUser from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


// function SignIn(props) {
//     const { classes } = props;


class SignIn extends React.Component {
        constructor(props) {
            super(props);

            // console.log(props);

            this.state = {

                regusername: "",
                logusername: "",
                regpssw: "",
                logpssw: "",
                conpssw: "",
                email: "",

                loggingIn: true,

                error: '',
            };
        }

/////////////////////////////////////METHODS/////////////////////////////////////////////




    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handlePageSwitch = pageSwitch => () => {
        this.setState({
            loggingIn: pageSwitch,
        });
    };


    handleLogin = (event, username = false, password = false) => {
        event.preventDefault();

        // this.props.onLogin(event, this.state.logusername, this.state.logpssw);

        // console.log(this.props)

        // fetch('/api/currentarticle')
        //     .then(response => response.json())
        //     .then(myJson => {
        //         this.setState({ currentArticleId: myJson._id });
        //         console.log("currentArticleId", myJson._id);
        //         // console.log(this.state.currentArticleId)
        //     })
        //     .catch(err => console.log(err))

        let formData = {
            "username": username || this.state.logusername,
            "password": password || this.state.logpssw,
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
            console.log(myJSON);
            if (myJSON.success) {
                this.props.handleUser(myJSON.user);

                // this.setState(
                //     { "user": myJSON.user,
                //      "loggedIn": true,
                //         regusername: "",
                //         logusername: "",
                //         regpssw: "",
                //         logpssw: "",
                //         conpssw: "",
                //         email: "",
                //      }
                // );

            } else {

            }
        }).catch((reason) => {
            this.setState({ "error": "Username or password incorrect!" });
        });
    };


    // should registering happen on this page? or on persistentDrawer? Should I just pass up
    // the response to persistentDrawer?

    handleRegister = event => {
        event.preventDefault();

        // this.props.onRegister(event, this.state.regusername, this.state.regpssw, this.state.conpssw, this.state.email);

        
        if (this.state.regpssw !== this.state.conpssw) {
            alert("passwords must match");
            return;
        }

        else {

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
                    this.props.handleUser(myJSON.user);
                    
                    // this.setState(
                    //     { "user": myJSON.user,
                    //      "loggedIn": true,
                    //         regusername: "",
                    //         logusername: "",
                    //         regpssw: "",
                    //         logpssw: "",
                    //         conpssw: "",
                    //         email: "", }
                    // );

                } else {
                    this.setState({ "error": myJSON.error })
                }

            });
        }
    };


/////////////////////////////////////METHODS/////////////////////////////////////////////


    render () {
    const { classes } = this.props;

    const login = (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography variant="headline">Sign in</Typography>
                    <Button size="small" className={classes.button} onClick={this.handlePageSwitch(false)}>
                        Register
                    </Button>
                    <form className={classes.form} onSubmit={this.handleLogin}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="logusername">Username</InputLabel>

                            <Input 
                            value={this.state.logusername} 
                            id="logusername"
                            name="logusername" 
                             autoFocus 
                             onChange={this.handleInputChange}
                            
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                value={this.state.logpssw} 
                                name="logpssw"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className={classes.submit}
                            
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );



    const register = (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AddUser />
                    </Avatar>
                    <Typography variant="headline">Register</Typography>
                    <Button size="small" className={classes.button} onClick={this.handlePageSwitch(true)}>
                        Sign In
                    </Button>
                    <form className={classes.form} onSubmit={this.handleRegister}>
                    

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="regusername">Username</InputLabel>
                            <Input
                                value={this.state.regusername} 
                                name="regusername"
                                id="regusername"
                                onChange={this.handleInputChange}
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                value={this.state.email} 
                                id="email" 
                                name="email" 
                                autoComplete="email" 
                                onChange={this.handleInputChange} 
                                autoFocus 
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                value={this.state.regpssw} 
                                name="regpssw"
                                type="password"
                                id="regPassword"
                                onChange={this.handleInputChange}
                                autoComplete="current-password"
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                            <Input
                                value={this.state.conpssw} 
                                name="conpssw"
                                type="password"
                                id="conPassword"
                                onChange={this.handleInputChange}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className={classes.submit}
                        >

                            Register

                        </Button>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );


        if (this.state.loggingIn) {
            return login;
        } else {
            return register;
        }
    }
}

// SignIn.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(SignIn);