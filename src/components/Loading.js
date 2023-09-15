
import React, { useState } from "react";


export function Loading() {


    return (
        <div className="spiner">
            <div className="spinner-border " role="status" >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;