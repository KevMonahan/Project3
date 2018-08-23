import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        open: false,
    };

    }
    

    // toggleDrawer = ( open ) => () => {
    //     this.setState({
    //         open: open,
    //     });
    // };

    toggleDrawer = () => () => {
        if (!this.state.open) {
            this.setState({ open: true });
        }
        else {
            this.setState({ open: false });
        }
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>


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
                    </div>
                
                
                
                </List>
            </div>
        );


        return (
            <div>
                <Button onClick={this.toggleDrawer()}>Open Left</Button>
              
                {this.props.children}
                
                <Drawer open={this.state.open} onClose={this.toggleDrawer()}>
                    {/* <div
                        tabIndex={0}
                        role="button"
                        // onClick={this.toggleDrawer()}
                    > */}
                        {sideList}
                    {/* </div> */}
                </Drawer>
                
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);