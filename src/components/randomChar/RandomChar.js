
import { Component } from 'react'

import Spinner from '../Spinner/Spinner.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
//import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    // хуки жизненнго цикла Создание компонента, обновление компонента, удаление компонента
    componentDidMount() {
        this.updateChar()
        console.log('mount')
    }

    componentDidUpdate() {
        console.log('Update')
    }

    componentWillUnmount() {
        console.log(console.log('Unmount'))
    }

    onCharLoaded = (char) => {
        // if (!char.description) {
        //     this.setState({ char: char.description = 'На данного персонажа нет описания' })
        // } else if (char.description.length > 192) {
        //     const str = char.description.slice(0, 192);
        //     this.setState({ char: char.description = `${str}...` })
        // }
        this.setState({
            char: char,
            loading: false
        });
       
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    render() {
        console.log('render')
        const { loading, char, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }


}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className="randomchar__block">
            {thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ?
                <img src={thumbnail} alt="Random character1" className="randomchar__img" style={{ objectFit: 'contain' }} /> :
                <img src={thumbnail} alt={name} className="randomchar__img" />}

            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;