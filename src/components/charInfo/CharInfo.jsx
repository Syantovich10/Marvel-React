import './charInfo.scss';
import {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";
import Skeleton from '../skeleton/Skeleton';



const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, getAllComics} = useMarvelService();
    const [comicCache, setComicCache] = useState({});
    useEffect(() => {
        updateChar();

    }, [props.charId]);

    useEffect(() => {
        const fetchComics = async () => {
                const res = await getAllComics(0, 100);
                setComicCache(res)
        };
        fetchComics();
    },[])

    const updateChar = () => {
        const {charId} = props;
        if(!charId){
            return;
        }
            getCharacter(charId)
            .then(onCharListLoaded)
    }



    const onCharListLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} comicCache={comicCache}/> : null;



    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}
const View = ({char, comicCache}) => {
    const { name,description,thumbnail, homepage,wiki,comics} = char;

    const matchComics = (comicName, result) => {
        // Я вынес result для того чтобы для каждого мэтча не делать запрос это писал Глеб
        const found = result.find((comic,i) => comic.title === comicName);
        return found ? found.id : null;
    }

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
                        const id = matchComics(comic,comicCache)
                        return (
                            <li key = {i} className="char__comics-item">
                                {id ? (
                                    <NavLink to={`/comics/${id}`}>{comic}</NavLink>
                                ) : (
                                    <span>{comic}</span>
                                )}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}



export default CharInfo;