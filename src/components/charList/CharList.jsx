import {useState, useEffect} from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";





const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);



   const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])



    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }




    const Content = (charList)=> {


        const items = charList.map((item) => {
            return (
                <li className="char__item" key={item.id}
                    onClick={() => props.onCharacterSelected(item.id)}>
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