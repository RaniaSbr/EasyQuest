// src/components/AddContainer.js
import React from 'react';
import "../Styles/moderateurForm.css";

function AddContainer({ onClose, children }) {
  return (
    <div className="overlay">
      <div className="modal">
        
        {children}
        <div>        <button onClick={onClose} className="close-button">Close </button>
</div>
      </div>
    </div>
  );
}

export default AddContainer;
