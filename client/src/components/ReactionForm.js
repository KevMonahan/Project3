import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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

const selectionScale = [
    {
        value: "1",
        label: "1 (Strongly Disagree)"
    },
    {
        value: "2",
        label: "2 (Disagree)"
    },
    {
        value: "3",
        label: "3 (Neutral)"
    },
    {
        value: "4",
        label: "4 (Agree)"
    },
    {
        value: "5",
        label: "5 (Strongly Agree)"
    }
]

class ReactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            value: "",
            selection: "",
            discussionWanted: ""
        }
    }

    handleInputChange = name => event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <form>
                <TextField
                    id="textarea"
                    label="Initial Article Thoughts"
                    multiline
                    rows="4"                    
                    className="userReaction textarea"
                    margin="30px"
                />
                <TextField
                    id="select-scale"
                    select
                    label="Level of Content Agreement"
                    className=""
                    value={this.state.selection}
                    onChange={this.handleChange("selection")}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="How much did you agree with the content of the article?"
                    margin="normal"
                >
                    {selectionScale.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="discussionPartner"
                    select
                    label="Discussion Partner Wanted?"
                    className="discussion"
                    value={this.state.discussionWanted}
                    onChange={this.handleChange("discussionWanted")}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Would you like a discussion partner?"
                    margin="normal"
                >
                    <MenuItem key={true} value={true}>Yes</MenuItem>
                    <MenuItem key={false} value={false}>No</MenuItem>
                </TextField>
                <button type="submit" className="reactionSubmit">Submit Thoughts</button>

            </form>
        )
    }
}
ReactionForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ReactionForm);