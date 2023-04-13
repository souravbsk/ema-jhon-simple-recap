import React from 'react';
import ReactImageZoom from 'react-image-zoom';

const ProductZoom = ({img}) => {
    const props = { zoomWidth: 500, img:img,zoomPosition: "original"};
    return (
        <ReactImageZoom {...props}>
            
        </ReactImageZoom>
    );
};

export default ProductZoom;
