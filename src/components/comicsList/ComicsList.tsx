import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import type {comic} from "../../types/types";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState<comic[]>([]);
    const [newComicsLoading, setNewComicsLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [comicsEnded, setComicsEnded] = useState<boolean>(false);


    const {loading, error, getAllComics} = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, []);


    const onRequest = (offset: number, initial?: boolean) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList: comic[]) => {
        let ended = false;
        if(newComicsList.length < 9) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsLoading(newComicsLoading => false);
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
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

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