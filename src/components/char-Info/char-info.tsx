import { FunctionComponent } from 'react';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/skeleton';
import { useAppSelector } from '../../redux/hooks/hooks';
import './charInfo.scss';

const View: FunctionComponent = () => {
    const { charId } = useAppSelector(state => state.marvelDataCharacter);

    const { name, description, thumbnail, urls, comics } = charId;
    const imgChar = `${thumbnail.path}.${thumbnail.extension}`;
    let imgStyle: string | number | {} = { 'objectFit': 'cover' };

    const urlWiki = urls[1].url;
    const homePage = urls[0].url;
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={imgChar} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={urlWiki} className="button button__secondary">
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
                {comics && comics.items.length > 0 ? null : 'Нет комиксов с этим персонажем'}
                {
                    comics && comics.items.map((item: { name: string }, i: number) => {
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

const CharInfo: FunctionComponent = () => {
    const { charId, status } = useAppSelector(state => state.marvelDataCharacter);
    return (
        <>
            {!charId && status === 'loading' ? <Spinner /> : (<div className="char__info">
                {charId.name ? <View /> : <Skeleton />}
            </div>)}
        </>
    )
}

export default CharInfo;
