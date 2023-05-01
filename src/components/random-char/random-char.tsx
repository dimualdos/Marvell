import { useEffect, FunctionComponent, useCallback } from 'react';
import Spinner from '../spinner/spinner';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchRandomCharId } from '../../redux/marvel-slice';
<<<<<<< HEAD
import { useMarvelGetAllComicsQuery, useMarvelGetCharacterIdQuery } from '../../redux/marvel-api';
=======
import { useMarvelGetCharacterIdQuery } from '../../redux/marvel-api';
>>>>>>> efe0860 (начало)

const RandomChar: FunctionComponent = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    const marvelID = useMarvelGetCharacterIdQuery(id);


    const dispatch = useAppDispatch();
    const { randomCharId } = useAppSelector(state => state.marvelDataCharacter);
    const { data, error, isLoading } = useMarvelGetAllComicsQuery();

    useEffect(() => {
        updateChar();
    }, [])

    const updateChar = useCallback(() => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
<<<<<<< HEAD
        dispatch(fetchRandomCharId(id));
=======

        //  dispatch(fetchRandomCharId(id));

>>>>>>> efe0860 (начало)
    }, [dispatch])


    return (
        <div className="randomchar">

            {randomCharId && randomCharId.id ? <View /> : <Spinner />}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={() => marvelID} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}



const View: FunctionComponent = () => {

    const { randomCharId } = useAppSelector(state => state.marvelDataCharacter);

    const { name, description, thumbnail, urls } = randomCharId!;
    const urlWiki = urls[1].url;
    const homePage = urls[0].url;
    const imgChar = `${thumbnail!.path}.${thumbnail!.extension}`;
    return (
        <div className="randomchar__block">
            {imgChar === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ?
                <img src={imgChar} alt="Random character1" className="randomchar__img" style={{ objectFit: 'contain' }} /> :
                <img src={imgChar} alt={name} className="randomchar__img" />}

            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={urlWiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;


