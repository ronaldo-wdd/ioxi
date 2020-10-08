import React from 'react';
import './buttons.css';

export const NextBtn = (props) => {
    const style = props.active
    ? { height: 100, transition: 'all .3s' }
    : { height: 100 }

    return (        
        <svg id="nextBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <style type="text/css">{`
                    .clsN-1{fill:#fc6;}
                    .clsN-2{fill:#232323;}
                    .clsN-3{fill:#fff;}
                `}</style>
            </defs>
            
            {/* <title>nextBtn</title> */}
            <rect id="rectG" className="clsN-2" width="100" height="100"/>
            <g id="rectY"><rect className="clsN-1 rectY" width="0" height="100" style={style}/></g>
            <g id="body0"><path className="clsN-3" d="M0,0V100H100V0ZM34.76,76.91,31.42,74,54.57,53.6,31,32.86l11.09-9.77L69,46.77Z"/></g>
        </svg>
    );
}

export const PrevBtn = (props) => {
    const style = props.active
    ? { height: 100, transition: 'all .3s' }
    : { height: 100 }

    return (
        <svg id="prevBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <style>{`
                    .clsP-1{fill:#fc6;}
                    .clsP-2{fill:#232323;}
                    .clsP-3{fill:#fff;}
                `}</style>
            </defs>

            {/* <title>prevBtn</title> */}
            <rect id="rectG" className="clsP-2" width="100" height="100"/>
            <g id="rectY"><rect className="clsP-1 rectY" width="0" height="100" style={style}/></g>
            <g id="body1"><path className="clsP-3" d="M0,0V100H100V0ZM31,46.77,57.91,23.09,69,32.86,45.43,53.6,68.58,74l-3.34,2.94Z" transform="translate(0 0)"/></g>
        </svg>
    );
}

export const CloseBtn = (props) => {
    const style = props.active
    ? { height: 100, transition: 'all .3s' }
    : { height: 100 }

    return (
        <svg id="closeBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <style>{`
                    .clsC-1{fill:#232323;}
                    .clsC-2{fill:#fc6;}
                    .clsC-3{fill:#fff;}
                `}</style>
            </defs>

            {/* <title>closeBtn</title> */}
            <rect id="rectG" className="clsC-1" width="100" height="100"/>
            <g id="rectY"><rect className="clsC-2 rectY" width="0" height="100" style={style}/></g>
            <path id="body2" className="clsC-3" d="M0,0V100H100V0ZM62.55,68.25l-9-8,0,0-7.5-6.71-7.29,6.52,0,0-9,8-3.39-3L42.63,50.48,26.15,35.75l11.3-10.1,9,8,0,0L54,40.36l7.29-6.52,0,0,9-8,3.39,3L57.37,43.42,73.85,58.15Z"/>
        </svg>
    );
}