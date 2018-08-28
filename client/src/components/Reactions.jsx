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
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "50px",
        marginTop: "50px"
    },
});


class Reactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId:this.props.userId,
            reaction: "",
            article_id: this.props.articleId,
            reactions: [],
        };
        console.log(this.props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.articleId === this.props.articleId;
    }
    
    componentDidMount() {
        this.loadReactions();
    }

    loadReactions = () => {
        fetch('/api/reactions/' + this.props.articleId)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ reactions: myJson });
            });
    }

    handleInteraction = (e) => {
        this.props.handleUser(e.target.id);
        // console.log("test")
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
                                // dense
                                button
                                
                            >
 
                                {/* {console.log(this.props.inDiscussion)} */}
                                <ListItemText primary={`${value.initial_opinion}`} />
                                {/* {value.wants_discussion ?  */}
                                {value.wants_discussion && !this.props.inDiscussion && this.props.user._id !== value._userId ? 

                                <ListItemSecondaryAction >
                                    
                                        <IconButton aria-label="Comments"
                                            style={{display: "block", backgroundColor: "gray"}}
                                            className={classes.listItem}
                                            onClick={this.handleInteraction}
                                            id={value._userId}
                                            test={"test"}>

                                            {/* <CommentIcon/> */}
                                        </IconButton> 
                                </ListItemSecondaryAction> : "" }
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