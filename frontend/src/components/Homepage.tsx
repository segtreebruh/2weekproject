import React, { useState } from "react";
import type { Contact } from "@shared/types";

interface HomepageProps {
  contacts: Contact[];
  username: string;
  handleLogout: () => void;
  handleAddContact: (name: string, number: string) => Promise<void>;
}

const Homepage = ({
  contacts,
  username,
  handleLogout,
  handleAddContact }: HomepageProps) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleAddContact(newName, newNumber);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <p className="homepage-user">{username} logged in</p>
        <button className="homepage-logout" onClick={handleLogout}>Logout</button>
        <h2 className="homepage-title">Your Contacts</h2>
      </div>
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact.id}>
            <span className="contact-name">{contact.name}</span>
            <span className="contact-number">{contact.number}</span>
          </div>
        ))}
      </div>
      <form className="add-contact-form" onSubmit={onSubmit}>
        <h3>Add new contact</h3>
        <div className="form-group">
          <label>Name:</label>
          <input className="input" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Number:</label>
          <input className="input" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button className="btn-primary" type="submit">Add</button>
      </form>
    </div>
  );
};

export default Homepage;
