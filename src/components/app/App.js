import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import {Component} from "react";

class App extends Component {
    state = {
        selectedCharacter: null
    }

    onCharacterSelected = (id) => {
        this.setState({selectedCharacter: id});
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharacterSelected={this.onCharacterSelected}/>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedCharacter}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;


