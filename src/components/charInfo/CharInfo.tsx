import './charInfo.scss'
import {useEffect, useState}  from "react";
import {NavLink} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import { useSelector } from "react-redux";
import { useLazyGetCharacterQuery } from "../../api/characterApi";
import { useGetAllComicsQuery } from "../../api/comicsApi";

import type {character, comic} from "../../types/types";
import type {RootState} from "../../store/store";


const CharInfo = () => {
    const selectedCharacter = useSelector((state: RootState) => state.ui.selectedCharacter)
    const [trigger, {data: charItem, isLoading, isFetching, isError}] = useLazyGetCharacterQuery();
    const {data: comics = []} = useGetAllComicsQuery(0);

    useEffect(() => {
        updateChar();
    }, [selectedCharacter]);


    const updateChar = () => {
        if(!selectedCharacter){
            return;
        }
            trigger(selectedCharacter, true)
    }

    const skeleton = !charItem && !isLoading && !isFetching && !isError ? <Skeleton/> : null;
    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = (isLoading || isFetching) ? <Spinner/> : null;
    const content = charItem && !isLoading && !isFetching && !isError
        ? <View char={charItem} comicCache={comics}/>
        : null;

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