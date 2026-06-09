import './comicsList.scss';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import { useLazyGetAllComicsQuery } from "../../api/heroesApi";

import type {comic} from "../../types/types";


const ComicsList = () => {
    const [comicsList, setComicsList] = useState<comic[]>([]);
    const [newComicsLoading, setNewComicsLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [comicsEnded, setComicsEnded] = useState<boolean>(false);

    const [trigger, {isLoading, isFetching, isError}] = useLazyGetAllComicsQuery();


    useEffect(() => {
        onRequest(offset);
    }, []);


    const onRequest = (offset: number) => {
        trigger(offset).unwrap().then((data: comic[]) => onComicsListLoaded(data))
    }

    const onComicsListLoaded = (newComicsList: comic[]) => {
        let ended = false;
        if(newComicsList.length < 9) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended);
    }

    function renderItems (comicsList: comic[]) {
        const items = comicsList.map(item => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = renderItems(comicsList);
    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = isLoading && !isFetching ? <Spinner/> : null;

    return (
        <div className="comics__list">
                {errorMessage}
                {spinner}
                {items}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;