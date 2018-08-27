import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    fontFamily: "Cardo",
    fontSize: "20px",
    width: "80%",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "scroll",
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
        // this.setState({article_id: this.props.article});
        console.log(this.state.article_id)
        // console.log(this.props)
        this.loadReactions();
    }

    loadReactions = () => {
        fetch('/api/articles/' + this.state.article_id)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ response: myJson[0] });
                // console.log(myJson);
                // console.log(this.state.response.body)
            });

    }


    render(){
    
        return (

    <div style={styles}>
    <h1>{this.state.response.headline}</h1>
    {/* {this.state.response.body} */}
    <div style={{ whiteSpace: "pre-wrap" }}>{this.state.response.body}</div>

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