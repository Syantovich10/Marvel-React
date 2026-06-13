import {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {useLazySearchCharacterByTrigramQuery} from "../../api/characterApi";
import {changeSelectChar} from "../../ui/uiSlice";

import "./charSearch.scss";

const CharSearch = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [validationError, setValidationError] = useState<string>("");
    const [wasSearched, setWasSearched] = useState<boolean>(false);

    const dispatch = useDispatch();
    const [trigger, {data: charItem, isFetching, isError}] = useLazySearchCharacterByTrigramQuery();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = searchValue.trim();

        if (!value) {
            setValidationError("Enter character name");
            setWasSearched(false);
            return;
        }

        setValidationError("");
        setWasSearched(false);

        try {
            const result = await trigger(value, true).unwrap();
            setWasSearched(true);

            if (result) {
                dispatch(changeSelectChar(result.id));
            }
        } catch {
            setWasSearched(true);
        }
    };

    const onClear = () => {
        setSearchValue("");
        setValidationError("");
        setWasSearched(false);
        dispatch(changeSelectChar(null));
    };

    const spinner = isFetching ? <Spinner/> : null;
    const errorMessage = isError ? <ErrorMessage/> : null;
    const validationMessage = validationError ? <div className="char-search__message char-search__message_error">{validationError}</div> : null;
    const notFoundMessage = wasSearched && charItem === null && !isFetching && !isError
        ? <div className="char-search__message char-search__message_error">The character was not found. Try another name or check the spelling.</div>
        : null;
    const successMessage = wasSearched && charItem && !isFetching && !isError
        ? <div className="char-search__message char-search__message_success">Found: {charItem.name}. Character info is opened on the right.</div>
        : null;

    return (
        <section className="char-search">
            <h2 className="char-search__title">Or find a character by trigrams:</h2>
            <form className="char-search__form" onSubmit={onSubmit}>
                <input
                    className="char-search__input"
                    type="text"
                    name="characterName"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter name"
                    aria-label="Character name"
                />
                <div className="char-search__actions">
                    <button className="button button__main" type="submit" disabled={isFetching}>
                        <div className="inner">find</div>
                    </button>
                    <button className="button button__secondary" type="button" onClick={onClear} disabled={isFetching}>
                        <div className="inner">clear</div>
                    </button>
                </div>
            </form>
            {spinner}
            {errorMessage}
            {validationMessage}
            {notFoundMessage}
            {successMessage}
        </section>
    );
};

export default CharSearch;
