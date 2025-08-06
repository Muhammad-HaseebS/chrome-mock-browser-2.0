import React from 'react';

const Icons: React.FC = () => {
    return (
        <div className="icons">
            <button className="icon-button" aria-label="Back">
                ←
            </button>
            <button className="icon-button" aria-label="Forward">
                →
            </button>
            <button className="icon-button" aria-label="Refresh">
                ⟳
            </button>
            <button className="icon-button" aria-label="Lock">
                🔒
            </button>
            <button className="icon-button" aria-label="Star">
                ☆
            </button>
            <button className="icon-button" aria-label="Menu">
                ⋮
            </button>
        </div>
    );
};

export default Icons;