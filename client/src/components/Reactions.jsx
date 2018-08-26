import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 640,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "50px"
    },
});


class Reactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId:"",
            reaction: "",
            article_id: "5b7f6e6fc72c920210a4acdd",
            reactions: [],
        };
    }

    componentDidMount() {
        this.loadReactions();
    }

    loadReactions = () => {
        fetch('/api/reactions/' + this.state.article_id)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ reactions: myJson });
                console.log(myJson);
                console.log(this.state.reactions)
            });
    }
    
        render(){
            const { classes } = this.props;

            return (
                <div className={classes.root}>
                    <List>
                        {this.state.reactions.map(value => (
                            <ListItem
                                key={value._id}
                                role={undefined}
                                dense
                                button
                                className={classes.listItem}
                            >
                                
                                <ListItemText primary={`${value.initial_opinion}`} />
                                <ListItemSecondaryAction>
                                    {value.wants_discussion ? 
                                    <IconButton aria-label="Comments">
                                        <CommentIcon />
                                    </IconButton> : "" }
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            );
        }
    
}

Reactions.propTypes = {
    classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(Reactions);