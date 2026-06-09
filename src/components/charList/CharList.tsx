import {useState, useEffect} from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";

import {useDispatch} from "react-redux";
import {changeSelectChar} from "../../ui/uiSlice"

import type {character} from "../../types/types";
import {useLazyGetAllCharactersQuery, useGetAllCharactersQuery} from "../../api/heroesApi";




const CharList = () => {
    const [charList, setCharList] = useState<character[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [charEnded, setCharEnded] = useState<boolean>(false);
    const dispatch = useDispatch();

    const [trigger, {isLoading, isFetching, isError}] = useLazyGetAllCharactersQuery();
    // const {data: chars, isLoading, isFetch} = useGetAllCharactersQuery(offset);

    useEffect(() => {
        onRequest(offset);
    }, [])

    const onRequest = (offset: number) => {
        trigger(offset).unwrap().then(data => onCharListLoaded(data));
    }

    const onCharListLoaded = (newCharList: character[]) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }




    const Content = (charList: character[])=> {


        const items = charList.map((item) => {
            return (
                <li className="char__item" key={item.id}
                    onClick={() => dispatch(changeSelectChar(item.id))}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <>
                {items}
            </>
        )
    }


    const items = Content(charList);
    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = isLoading && !isFetching ? <Spinner/> : null;




        return (

            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {items}
                </ul>
                <button
                    className="button button__main button__long"
                    disabled={isFetching}
                    style={{'display':charEnded ? 'none' : 'block'}}
                onClick={()=>onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
}




export default CharList;