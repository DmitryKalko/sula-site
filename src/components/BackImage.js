import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const BackImage = (props) => {
    const { linkImg } = props;
    return (
        <div>
            <LazyLoadImage
                //alt={'b'}
                //height={}
                src={`url(${process.env.PUBLIC_URL + '/pagesImg/' + linkImg})`}
                //width={} 
                effect="blur" />
        </div>
    )
};

export default BackImage;