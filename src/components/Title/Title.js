import React from "react";

export default function Title() {



    return (
        <div className="flex flex-col self-center justify-center align-center lg:py-10">
            <img className="w-44 self-center pb-8" src="logoEditofOpacity.png" alt='logo'></img>
            <span className="self-center text-yellow-100 uppercase text-6xl font-bold font-sans"><h1>editof</h1></span>
            <span className="self-center text-white text-xl mb-8 font-sans"><p>A lightweight image editor for your photos</p></span>

        </div>
    );
}
