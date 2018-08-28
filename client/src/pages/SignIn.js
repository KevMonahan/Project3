import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField'

import LockIcon from '@material-ui/icons/LockOutlined';
import AddUser from '@material-ui/icons/PersonAdd';


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
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        backgroundColor: "#eceef8"
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

            error: ' ',
            passwordError: " ",
            confirmPasswordError: " ",
            usernameError: " "
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
                this.setState({ "error": "Username or password incorrect" });
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
            this.setState({confirmPasswordError: "Passwords must match"});
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
                if (myJSON.usernameError || myJSON.passwordError) {
                    this.setState({ "usernameError": (myJSON.usernameError?myJSON.usernameError:" "), "passwordError": (myJSON.passwordError?myJSON.passwordError:" "), "confirmPasswordError": " "})
                } else {
                    this.props.handleUser(myJSON.user);
                }

            });
        }
    };


    /////////////////////////////////////METHODS/////////////////////////////////////////////


    render() {
        const { classes } = this.props;

        const login = (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    
                    <Typography variant="display2" style={{textAlign: "left"}}>The Article Daily</Typography>
                    <Typography variant="headline" style={{textAlign: "left"}}>Deconstructing the news for constuctive discussions</Typography>
                    <Typography variant="body2" style={{textAlign: "left"}}>Read a new article each day, give your initial thoughts on it, and find a discussion partner.  At the Article Daily, we strongly believe in looking at the cold, hard facts.  In reading the news, that means presenting information first without the triggering headlines.</Typography>
                    
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
                                <TextField
                                    id="logusername"
                                    label="Username"
                                    name="logusername"
                                    className={classes.textField}
                                    helperText={this.state.error}
                                    error={!(this.state.error === " ")}
                                    margin="normal"
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
                                    error={!(this.state.error === " ")}
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

                    <Typography variant="display2" style={{textAlign: "left"}}>The Article Daily</Typography>
                    <Typography variant="headline" style={{textAlign: "left"}}>Deconstructing the news for constuctive discussions</Typography>
                 

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
                                <TextField
                                    id="regusername"
                                    label="Username"
                                    name="regusername"
                                    className={classes.textField}
                                    helperText={this.state.usernameError}
                                    error={!(this.state.usernameError === " ")}
                                    margin="normal"
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="regPassword"
                                    label="Password"
                                    name="regpssw"
                                    type="password"
                                    className={classes.textField}
                                    helperText={this.state.passwordError}
                                    error={!(this.state.passwordError === " ")}
                                    margin="normal"
                                    onChange={this.handleInputChange}
                                />
                            </FormControl>


                             <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="conPassword"
                                    label="Confirm Password"
                                    name="conpssw"
                                    type="password"
                                    className={classes.textField}
                                    helperText={this.state.confirmPasswordError}
                                    error={!(this.state.confirmPasswordError === " ")}
                                    margin="normal"
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

export default withStyles(styles)(SignIn);