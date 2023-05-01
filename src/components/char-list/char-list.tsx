import { useState, useRef, FunctionComponent, CSSProperties, useCallback } from 'react';
import nextId from "react-id-generator";
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import { IChar } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchCharacterId, fetchMarvel } from '../../redux/marvel-slice';
import './charList.scss';
import { _baseOffset } from '../../services/marvel-service';



const CharList: FunctionComponent = () => {
    const { charItemsData, status, charId } = useAppSelector(state => state.marvelDataCharacter);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(_baseOffset);
    const [charEnded, setCharEnded] = useState(false);
    const dispatch = useAppDispatch();
    //Рефы 
    const itemRefs: any = useRef([]);

    const focusOnItem = (id: string | number) => {

        itemRefs.current.forEach((item:
            { classList: { remove: (arg0: string) => any; }; }) => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const getCharacterIdItem = useCallback((e: { preventDefault: () => void; }, id: number) => {
        if (id === charId.id) return;
        e.preventDefault();
        dispatch(fetchCharacterId(id));
    }, [charId.id, dispatch]);

    const onRequest = useCallback(() => {
        let ended = false;
        if (charItemsData.length < 9) {
            ended = true;
        }
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
        dispatch(fetchMarvel(offset));
    }, [charItemsData.length, dispatch, offset]);

    const renderItems = (charItems: IChar[]) => {
        const items = charItems!.map((item: IChar, i: number) => {

<<<<<<< HEAD
=======
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    const renderItems = (charItems: any) => {
        const items = charItems!.map((item: IChar, i: number) => {
>>>>>>> efe0860 (начало)
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={elem => itemRefs.current[i] = elem}
                    key={`${item.id}${nextId()}`}
                    onClick={(e) => {
                        getCharacterIdItem(e, item.id!);
                        focusOnItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            getCharacterIdItem(e, item.id!);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle as CSSProperties | undefined} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="char__list">
<<<<<<< HEAD
            {status === 'rejected' ? <ErrorMessage /> : (charItemsData.length > 0 ? renderItems(charItemsData) : <Spinner />)}
=======
            {status === 'rejected' ? <ErrorMessage /> : (charItems.length > 0 ? renderItems(charItems) : <Spinner />)}
>>>>>>> efe0860 (начало)
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}

                onClick={() => onRequest()}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
export default CharList; 
