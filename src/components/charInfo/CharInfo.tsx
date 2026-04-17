import './charInfo.scss'
import {useEffect, useState}  from "react";
import {NavLink} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";
import Skeleton from '../skeleton/Skeleton';
import * as React from 'react';
import type {character, comic} from "../../types/types";



const CharInfo = ({charId} : {charId: number | string | null}) => {
    const [char, setChar] = useState<character | null>(null);
    const {loading, error, getCharacter, getAllComics} = useMarvelService();
    const [comicCache, setComicCache] = useState<comic[] | []>([]);
    useEffect(() => {
        updateChar();
    }, [charId]);

    useEffect(() => {
        const fetchComics = async () => {
                const res = await getAllComics(0, 100);
                setComicCache(res)
                console.log(res)
        };
        fetchComics();
    },[])

    const updateChar = () => {
        if(!charId){
            return;
        }
            getCharacter(charId)
            .then(onCharListLoaded)
    }



    const onCharListLoaded = (char: character) => {
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

type ViewProps = {
    char: character,
    comicCache: comic[],
}

const View = ({char, comicCache} : ViewProps) => {
    const { name,description,thumbnail, homepage,wiki,comics} = char;

    const matchComics = (comicName : string, result: comic[]) => {
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