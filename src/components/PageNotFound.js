import Lottie from 'react-lottie';
import animationData from '../animation/pageNotFound.json'
import './styles/PageNotFound.css';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const PageNotFound = (props) => {
    const { lottieClick, pageNotFound, screenHeight, screenWidth } = props;
    return (
        <div className='page-not-found'
            onClick={lottieClick}
            style={pageNotFound === true ? { display: 'block' } : { display: 'none' }}
        >
            <Lottie
                options={defaultOptions}
                height={screenHeight * 0.65}
                width={screenWidth * 0.7}  
            />
        </div>
    )
};

export default PageNotFound;