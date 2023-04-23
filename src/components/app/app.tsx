import { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-Info/char-info";
import ErrorBoundary from "../error-boundary/error-boundary";
import styles from './app.module.css'
import decoration from '../../resources/img/vision.png';
import { useAppDispatch } from "../../redux/hooks/hooks";
import { fetchMarvel } from "../../redux/marvel-slice";
import { _baseOffset } from "../../services/marvel-service";


export const App = () => {
    const dispatch = useAppDispatch();

    const [showRandomChar, setShowRandomChar] = useState(true)

    const toggleRandomChar = () => {
        setShowRandomChar(!showRandomChar)
    }


    useEffect(
        () => {
            dispatch(fetchMarvel(_baseOffset))
        }, [dispatch]);

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    {showRandomChar ? <RandomChar /> : null}
                </ErrorBoundary>

                <button className={styles.buttonApp} onClick={toggleRandomChar}>{showRandomChar ? "скрыть случайного персонажа" : 'показать случайного персонажа'}</button>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <CharInfo />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}
