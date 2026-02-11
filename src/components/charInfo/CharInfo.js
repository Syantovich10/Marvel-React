import './charInfo.scss';

import {Component} from "react";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from "../../services/MarvelService";


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }




    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // Подписываемся на событие скролла
        window.addEventListener('scroll', this.onScroll);
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentWillUnmount() {
        // Обязательно удаляем обработчик, чтобы не было утечек памяти
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight) {
            console.log("Вы достигли конца страницы!");
            // Здесь можно вызвать метод для загрузки дополнительных данных
            // this.onLoadMore();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId){
            return;
        }
        this.onCharLoading()
        this.marvelService
            .getCharacter(charId)
                .then(this.onCharListLoaded)
                .catch(this.onError);


    }
    onCharListLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,

        })
    }

    onCharLoading = () => {
        this.setState({loading: true});

    }

    render() {
        const {char,loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {id, name,description,thumbnail, homepage,wiki,comics} = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map((comic,i) => {
                        return (
                            <li key = {id} className="char__comics-item">
                                {comic}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default CharInfo;