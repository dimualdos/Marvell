import { useState, useEffect, FunctionComponent } from 'react';

import MarvelService from '../../services/marvel-service';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/skeleton';


import './charInfo.scss';
import { IChar } from '../../types/types';

const View: FunctionComponent<{ char: IChar }> = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgStyle: string | number | {} = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Нет комикосв с этим персонажем'}
                {
                    comics.map((item: { name: string }, i: number) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}


const CharInfo: FunctionComponent<{ charId: number }> = (props) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        setLoading(false);
    }, [props.charId]);

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char: any) => {
        setLoading(false);
        setChar(char);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    return (
        <>
            {!char && loading ? <Spinner /> : (<div className="char__info">
                {char ? <View char={char} /> : <Skeleton />}
            </div>)}
        </>
    )

}

export default CharInfo;
