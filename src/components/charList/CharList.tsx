import {useState, useEffect} from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import {useGetAllCharactersQuery} from "../../api/characterApi";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectChar, changeCharsOffset} from "../../ui/uiSlice"

import type {character} from "../../types/types";
import type {RootState} from "../../store/store";


const CharList = () => {
    const [charEnded, setCharEnded] = useState<boolean>(false);
    const charsOffset = useSelector((state: RootState) => state.ui.charsOffset)
    const dispatch = useDispatch();

    const {data: chars=[], isLoading, isFetching, isError} = useGetAllCharactersQuery(charsOffset);

    useEffect(() => {
        if (chars.length > 0 && chars.length % 9 !== 0) {
            setCharEnded(true);
        }
    }, [chars]);

    const onLoadMore = () => {
        dispatch(changeCharsOffset());
    };

    const Content = (charList: character[])=> {
        const items = charList.map((item) => {
            return (
                <li className="char__item" key={item.id}>
                    <button
                        type="button"
                        className="char__item-button"
                        onClick={() => dispatch(changeSelectChar(item.id))}
                    >
                        <img src=
                                 {item.thumbnail}
                             alt={item.name} />
                        <span className="char__name">{item.name}</span>
                    </button>
                </li>
            )
        })
        return (
            <>
                <ul className="char__grid">
                    {items}
                </ul>
            </>
        )
    };


    const items = Content(chars);
    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = isFetching ? <Spinner/> : null;

        return (
            <div className="char__list">
                    {errorMessage}
                    {items}
                    {spinner}
                <button
                    className="button button__main button__long"
                    disabled={isFetching}
                    style={{'display':charEnded || isLoading || isFetching ? 'none' : 'block'}}
                onClick={()=>onLoadMore()}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
}


export default CharList;