import { useState } from "react";
import ErrorBoundary from "../error-boundary/error-boundary";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-Info/char-info";
import decoration from '../../resources/img/vision.png';
import styles from './pages.module.css'




const MainPage = () => {

    const [showRandomChar, setShowRandomChar] = useState(true)
    const toggleRandomChar = () => {
        setShowRandomChar(!showRandomChar)
    }

    return (
        <>
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
        </>
    )
}

export default MainPage;