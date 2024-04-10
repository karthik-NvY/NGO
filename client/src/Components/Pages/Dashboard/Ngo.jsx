import React from "react";

function Ngo({name, creator}) {
    return(
        <div className="ngolist">
            <h1>{name}</h1>
            <p>{creator}</p>
        </div>
    )
}

export default Ngo;