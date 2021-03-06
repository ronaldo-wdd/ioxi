import React from 'react';

export default function svg (props) {
    let archStudioStyle = props.showText
        ? {
            transition: 'all .5s ease',
            transform: "translateY(135px)",
            opacity: '1'
        } 
        : {
            transition: 'all .5s ease', 
            transform: "translateY(80px)",
            opacity: '0'
        };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 445.29 142.71">
            <defs>
                <style type="text/css">{`
                    .cls-1, .cls-2{fill:#fff;}
                    .cls-2{
                        font-size:26.88px;
                        font-family: OpenSans, Open Sans;
                        letter-spacing:0.25em;
                    }
                    @media(max-width: 1024px) {
                        #arch_studio text {opacity: 0!important}
                    }
                `}</style>
            </defs>
            
            {/* <title>logo</title> */}
            <g id="ioxi">
                <path 
                    className="cls-1" 
                    d="M172.12,186.45v3.76l-.32,29.44.32,40.13H139.25l.32-43.89-.38-26.8.06-2.64Z" 
                    transform="translate(-40.02 -184.2)"/>
                <path 
                    className="cls-1" 
                    d="M200.31,189.77a39.28,39.28,0,0,1,15.91-5.32,37.69,37.69,0,0,1,23.62,5,39.35,39.35,0,0,1,14.1,14,38.53,38.53,0,0,1-.53,39.94,38.83,38.83,0,0,1-13.21,13.09,39.56,39.56,0,0,1-42.93-2,38.52,38.52,0,0,1-15.91-30.05A37.94,37.94,0,0,1,188,201.37,39.08,39.08,0,0,1,200.31,189.77ZM198.52,195l17.67,30.18L231.33,250l3.41,5.59a19.69,19.69,0,0,0,3.16-1.51,36,36,0,0,0,14.85-16.52A34.28,34.28,0,0,0,255.42,218a36.13,36.13,0,0,0-4.73-13.14,35,35,0,0,0-12.8-12.62,33.77,33.77,0,0,0-20.84-4.5,36.6,36.6,0,0,0-15.42,5.09A21.68,21.68,0,0,0,198.52,195Z" 
                    transform="translate(-40.02 -184.2)"/>
                <path 
                    className="cls-1" 
                    d="M318.94,216.74l1.13,1.72q10.85,17.25,15,23.53t12.45,17.79H309.32l-18.59-30.24q-8.7,10.32-20.14,26.27a32.85,32.85,0,0,1-3.22,4,3.18,3.18,0,0,1-2.15,1c-1.29,0-1.94-.59-1.94-1.77a2.63,2.63,0,0,1,.41-1.37c.26-.45,1.24-1.73,2.92-3.85l1.89-2.31,20.1-25.32-25.75-39.73h37.71l16.24,27q5.76-7,16.37-21.63,3.12-4.35,4.06-5.34a2.73,2.73,0,0,1,2-1,2.15,2.15,0,0,1,1.5.59,1.85,1.85,0,0,1,.65,1.4,4,4,0,0,1-.89,2.26q-.88,1.23-6.14,7.73Z" 
                    transform="translate(-40.02 -184.2)"/>
                <path 
                    className="cls-1" 
                    d="M386.14,186.45v3.76l-.32,29.44.32,40.13H353.26l.32-43.89-.37-26.8.05-2.64Z" 
                    transform="translate(-40.02 -184.2)"/>
            </g>
            
            <g id="arch_studio" data-name="Layer 2">
                <text 
                    className="cls-2"
                    // transform="translate(0 135.42)"
                    style={archStudioStyle} >
                    ARCHITECTURAL STUDIO</text>
            </g>
        </svg>
    );
}