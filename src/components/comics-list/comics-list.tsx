import { useState, useEffect, Key, FunctionComponent } from 'react';

import './comics-list.scss';
import ErrorMessage from '../error-message/error-message';
import Spinner from '../spinner/spinner';
import { fetchAllComics } from '../../redux/marvel-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';

const ComicsList: FunctionComponent = () => {
    const { allComics, status, error } = useAppSelector(state => state.marvelDataCharacter);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState<number>(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const dispatch = useAppDispatch();

    // const { allComics, status, error }
    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset: number, initial?: boolean | undefined) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        dispatch(fetchAllComics(offset))
        onComicsListLoaded()
    }

    const onComicsListLoaded = () => {
        let ended = false;
        if (allComics.length < 8) {
            ended = true;
        }
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr: any[]) {
        const items = arr.map((item: { thumbnail: string; title: string; price: string | number }, i: Key) => {
            return (
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail}
                            alt={item.title}
                            className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(allComics);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = status === 'loading' && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
