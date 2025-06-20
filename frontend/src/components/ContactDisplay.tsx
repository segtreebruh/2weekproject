import React, { useState } from "react";
import type { Contact } from "@shared/types";

interface ContactDisplayProps {
  contacts: Contact[];
  username: string;
  handleLogout: () => void;
  handleAddContact: (name: string, number: string) => Promise<void>;
}

interface ContactComponentProps {
  contact: Contact;
}

const ContactComponent: React.FC<ContactComponentProps> = ({ contact }) => {
  return (
    <div>
      {contact.name} {contact.number}
    </div>
  );
};

const ContactDisplay: React.FC<ContactDisplayProps> = ({
  contacts,
  username,
  handleLogout,
  handleAddContact,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleAddContact(newName, newNumber);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <div>
        <p>{username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>Your Contacts</h2>
      </div>
      {contacts.map((contact) => (
        <ContactComponent key={contact.id} contact={contact} />
      ))}

      <form onSubmit={onSubmit}>
        <h3>Add new contact</h3>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ContactDisplay;
