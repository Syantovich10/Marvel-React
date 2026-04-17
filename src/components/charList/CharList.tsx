import {useState, useEffect} from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";
import type {character} from "../../types/types";
type Props = {
    onCharacterSelected: (id: string | number) => void;
}



const CharList = ({onCharacterSelected} : Props) => {
    const [charList, setCharList] = useState<character[]>([]);
    const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [charEnded, setCharEnded] = useState<boolean>(false);



   const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])



    const onRequest = (offset: number, initial?: boolean) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList: character[]) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }




    const Content = (charList: character[])=> {


        const items = charList.map((item) => {
            return (
                <li className="char__item" key={item.id}
                    onClick={() => onCharacterSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    const items = Content(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;




        return (

            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {items}
                </ul>
                <button

                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display':charEnded ? 'none' : 'block'}}
                onClick={()=>onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
}




export default CharList;