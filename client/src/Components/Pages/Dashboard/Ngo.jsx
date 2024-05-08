import React from "react";
import "./Ngo.css";

function Ngo({name, creator, back}) {
    return(
        <div className="ngolist">
            <div className="ngoName">{name}</div>
            {/*<p>{creator}</p>*/}
            <div className="ngoImagediv">
                <img src={back} className="homeNgoimg"></img>
            </div>            
        </div>
    )
}

export default Ngo;