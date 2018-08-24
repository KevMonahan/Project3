import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});


class TextFields extends React.Component {
    state = {
        value:'',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
               
                <TextField
                    required
                    id="required"
                    label="Required"
                    defaultValue="Hello World"
                    className={classes.textField}
                    margin="normal"
                />
                
                <TextField
                    id="password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                />
                
                
                <TextField
                    id="with-placeholder"
                    label="With placeholder"
                    placeholder="Placeholder"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="textarea"
                    label="With placeholder multiline"
                    placeholder="Placeholder"
                    multiline
                    className={classes.textField}
                    margin="normal"
                />                           
                <TextField
                    id="full-width"
                    label="Label"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                />
                
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);