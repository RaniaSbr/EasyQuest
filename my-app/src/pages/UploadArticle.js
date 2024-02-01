import React, { useState } from 'react';
import axios from 'axios';

const ArticleUploader = () => {
  const [url, setUrl] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUpload = async () => {
    try {
      // Envoyer l'URL au backend Django pour le traitement en utilisant une requête GET
      const response = await axios.get('http://localhost:8000/upload/', {
        params: { url },
      });

      // Afficher un message de succès ou faire d'autres actions nécessaires
      console.log('Upload réussi!', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'upload', error);
      // Gérer les erreurs et afficher un message à l'utilisateur si nécessaire
    }
  };

  return (
    <div>
      <label>URL du PDF:</label>
      <input type="text" value={url} onChange={handleUrlChange} />
      <button onClick={handleUpload}>Uploader</button>
    </div>
  );
};

export default ArticleUploader;
