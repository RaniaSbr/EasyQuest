// ChangePassword.js

import React, { useState } from "react";

const Change_password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = () => {
    // ... (Votre logique de changement de mot de passe)

    // Réinitialisez les champs du formulaire après la réussite du changement de mot de passe
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Le mot de passe a été changé avec succès.");
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md p-4 bg-gray-100 rounded shadow">
        <h2 className="text-2xl mb-4">Changer le mot de passe</h2>
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Ancien mot de passe:
          </label>
          <input
            type="password"
            id="currentPassword"
            className="mt-1 p-2 w-full border text-grey rounded-md"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Nouveau mot de passe:
          </label>
          <input
            type="password"
            id="newPassword"
            className="mt-1 p-2 text-grey w-full border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirmer le nouveau mot de passe:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 text-grey p-2 w-full border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 flex justify-center items-center w-[100%] text-blue text-bold text-white p-2 rounded-md hover:bg-blue-600"
        >
          Changer le mot de passe
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Change_password;
