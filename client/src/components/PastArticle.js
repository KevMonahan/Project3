import React from 'react';

class PastArticle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articleId: props.article,
            onClick: props.onClick,
            headline: "PLACEHOLDER"
        }

        console.log('/api/articles/' + this.state.articleId);
        fetch('/api/articles/' + this.state.articleId)
        .then(response => response.json())
        .then(myJson => {
            console.log("trying to fetch read article headline");
            console.log(JSON.stringify(myJson));
            this.setState({headline: myJson[0].headline});
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return <button onClick={() => {this.state.onClick(this.state.articleId)}}>{this.state.headline}</button>;
    }
}

export default PastArticle;