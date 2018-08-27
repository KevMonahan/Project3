import React from 'react';
import PastArticle from './PastArticle';

class PastArticles extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: props.articles,
            onClick: props.onClick
        }    
    }

    render() {
        // let myArticle = this.state.articles[0];
        // return <PastArticle article={myArticle} onClick={this.state.onClick}/>;
        return (<tbody>{this.state.articles.map((article, i) => <PastArticle key={i} article={this.state.articles[i]} onClick={this.state.onClick}/>)}</tbody>);
    }
}

export default PastArticles;