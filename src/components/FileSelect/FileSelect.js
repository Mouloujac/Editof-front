// FileSelect.js
import React from "react";

export default function FileSelect({ onSelectFile }) {

    return (
        <div className="FileSelect">
            <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
    );
}
