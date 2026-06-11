import {useParams,useNavigate, NavLink} from "react-router-dom";

import { useEffect } from "react";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

import { useGetComicQuery } from "../../api/comicsApi";

import type { comic } from "../../types/types";

const SingleComicPage = () => {
    const {comicId} = useParams<{comicId: string}>();
    const navigate = useNavigate();
    const {data: comic, isLoading, isFetching, isError} = useGetComicQuery(comicId ?? '', {
        skip: !comicId
    });

    useEffect(() => {
        if(isError) {
            navigate('/404')
        }
    }, [isError]);

    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = isLoading || isFetching ? <Spinner/> : null;
    const content = !(isLoading || isFetching || isError || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}: {comic: comic}) => {
    const {title, description, thumbnail, pageCount, price, languages} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <NavLink
                end
                style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                className="single-comic__back"
                to='/comics'>Back to All</NavLink>
        </div>
    )
}

export default SingleComicPage;