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

        this.state = {
            userId: "",
            reaction: "",
            article_id: "",
            reactions: [],
            body: "",
            headline: "",
            url: "",
            response: []
        };
    }

    componentDidMount() {
        this.setState({article_id: this.props.article});
        this.loadReactions();
    }

    loadReactions = () => {
        fetch('/api/articles/' + this.state.article_id)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ response: myJson[0] });
                console.log(myJson);
                console.log(this.state.response)
            });
    }

    render(){
        return (

    <div style={styles}>
    <h1>{this.state.response.headline}</h1>
    <p>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle
    poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia
    tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym,
     pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją
      arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje
      Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak
      Aldus PageMaker
          </p>
    <p>Skąd się to wzięło?
  W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono
  korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu!
    Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii, przyjrzał się uważniej
    jednemu z najbardziej niejasnych słów w Lorem Ipsum – consectetur – i po wielu poszukiwaniach odnalazł
    niezaprzeczalne źródło: Lorem Ipsum pochodzi z fragmentów (1.10.32 i 1.10.33) „de Finibus Bonorum et Malorum”
    zyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona. Jest to bardzo popularna w
    czasach renesansu rozprawa na temat etyki. Pierwszy wiersz Lorem Ipsum, „Lorem ipsum dolor sit amet...”
          pochodzi właśnie z sekcji 1.10.32.</p>
    <p>Skąd się to wzięło?
  W przeciwieństwie do rozpowszechnionych opinii, Lorem Ipsum nie jest tylko przypadkowym tekstem. Ma ono
  korzenie w klasycznej łacińskiej literaturze z 45 roku przed Chrystusem, czyli ponad 2000 lat temu!
    Richard McClintock, wykładowca łaciny na uniwersytecie Hampden-Sydney w Virginii, przyjrzał się uważniej
    jednemu z najbardziej niejasnych słów w Lorem Ipsum – consectetur – i po wielu poszukiwaniach odnalazł
    niezaprzeczalne źródło: Lorem Ipsum pochodzi z fragmentów (1.10.32 i 1.10.33) „de Finibus Bonorum et Malorum”
    zyli „O granicy dobra i zła”, napisanej właśnie w 45 p.n.e. przez Cycerona. Jest to bardzo popularna w
    czasach renesansu rozprawa na temat etyki. Pierwszy wiersz Lorem Ipsum, „Lorem ipsum dolor sit amet...”
          pochodzi właśnie z sekcji 1.10.32.</p>
</div>
        )
    }

}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Article);