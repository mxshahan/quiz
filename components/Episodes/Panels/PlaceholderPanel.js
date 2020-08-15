import React, {memo} from 'react';
import renderHTML from 'react-render-html';

const PlaceholderPanel = ({episode}) => {

    return (
        <>
            {renderHTML("<p>This is a placeholder for the next amazing episode in your course! 🎉</p>")}
        </>
    )
}

export default memo(PlaceholderPanel);
