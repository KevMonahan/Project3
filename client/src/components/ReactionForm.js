import React from "react";
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

class ReactionForm extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             userId: "",
             value: ""
         }
     }

     handleInputChange = name => event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
     }

     render() 




}