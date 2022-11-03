import {useState,useEffect} from "react";
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const RandomChar = () => {
    const [char, setChar] = useState(null);

   const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        upDataChar();
        const timerId = setInterval(upDataChar, 9000);

        return () => {
            clearInterval(timerId);
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const upDataChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacter(id)
            .then(onCharLoaded);
    }

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={upDataChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
}

const View = ({char}) => {
    const {description, thumbnail, homepage, wiki} = char;
    const notFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    //
    // let className = 'randomchar__img'
    // if (thumbnail === notFound) {
    //     className += ' randomchar__not-found';
    // }

    return(
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className={`randomchar__img ${thumbnail === notFound ? 'randomchar__not-found' : ''}`}
                // style={{'object-fit': thumbnail === notFound ? 'contain' : 'cover'}}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{char?.name}</p>
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