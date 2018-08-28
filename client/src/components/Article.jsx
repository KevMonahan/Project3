import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    fontFamily: "Cardo",
    fontSize: "20px",
    width: "70%",
    textAlign: "left",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "scroll",
    overflowX: "hidden",
    overflowY: "auto",
};


class Article extends React.Component {
    constructor(props) {
        super(props);

        // console.log(props);

        this.state = {
            userId: "",
            reaction: "",
            article_id: this.props.article,
            reactions: [],
            body: "",
            headline: "",
            url: "",
            response: []
        };
    }

    componentDidMount() {
        console.log(this.state.article_id)
        this.loadReactions();
    }

    loadReactions = () => {
        fetch('/api/articles/' + this.state.article_id)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ response: myJson[0] });
            });
    }

    render(){
    
        return (

    <div style={styles}>
        {this.props.reacted ? <h1 style={{textAlign: "center"}}>{this.state.response.headline}</h1> : <h1>The Daily Article</h1> }
        {this.props.reacted ? <h2 style={{ textAlign: "center"}}>◆ {this.state.response.author} ◆</h2> : "" }
                {this.props.reacted ? <a href={this.state.response.article_url} target="_blank" style={{ textDecoration: "none" }}><h4 style={{ textAlign: "center" }}>'{this.state.response.article_url}'</h4></a> : ""}
        <div style={{ whiteSpace: "pre-wrap", marginTop: "70px"}}>{this.state.response.body}</div>

        {/* {console.log(this.state.response.body)} */} 
    </div>

        )
    }
}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Article);