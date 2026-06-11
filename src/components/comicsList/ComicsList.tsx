import './comicsList.scss';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import { changeComicsOffset } from "../../ui/uiSlice";
import { useGetAllComicsQuery } from "../../api/comicsApi";
import { useSelector, useDispatch } from "react-redux";

import type { comic } from "../../types/types";
import type { RootState } from "../../store/store";


const ComicsList = () => {
    const comicsOffset = useSelector((state : RootState) => state.ui.comicsOffset)
    const [comicsEnded, setComicsEnded] = useState<boolean>(false);
    const dispatch = useDispatch();

    const {data:comicsList=[],isFetching, isError} = useGetAllComicsQuery(comicsOffset);

    useEffect(() => {
        if (comicsList.length > 0 && comicsList.length % 9 !== 0) {
            setComicsEnded(true);
        }
    }, [comicsList]);

    const onLoadMore = () => {
        dispatch(changeComicsOffset());
    };

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
    const spinner = isFetching ? <Spinner/> : null;

    return (
        <div className="comics__list">
                {errorMessage}
                {items}
                {spinner}
            <button
                className="button button__main button__long"
                disabled={isFetching}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onLoadMore()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;