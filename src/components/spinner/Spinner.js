import img from './spinner.gif';

const Spinner = () => {
    return (
        <img style={{margin: '0 auto', background: 'none', display: 'block'}} width="50px" height="50px" src={img} alt="Spinner"/>
    )
}

export default Spinner;