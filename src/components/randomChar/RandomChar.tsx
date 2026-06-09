
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import {useState, useEffect} from "react";
import type {character} from "../../types/types";
import {useLazyGetCharacterQuery} from "../../api/heroesApi";


const RandomChar = () => {
    // const {loading, error, getCharacter, clearError} = useMarvelService();

    const [trigger, { data: charItem, isLoading, isFetching, isError}] = useLazyGetCharacterQuery();

    useEffect(() => {
        getRandomChar();
    }, []);

    const getRandomChar = () => {
        const max = 20
        const min = 1
        const id = Math.floor(Math.random() * (max - min + 1)) + min;
        trigger(id)
    }



    // const updateChar = () =>{
    //     clearError();
    //
    //     getCharacter(id)
    //         .then(onCharLoaded)
    // }


    const isSearching = isLoading || isFetching;

        const errorMessage = isError ? <ErrorMessage/> : null;
        const spinner = (isLoading || isFetching) ? <Spinner/> : null;
    const content = !(isSearching || isError) && charItem ? <View charItem={charItem}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={getRandomChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )

}

const View = ({charItem} : {charItem: character})=> {
    const {name,description,thumbnail,homepage,wiki} = charItem;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;