import React from 'react';
import type { Contact } from '@shared/types';

interface ContactDisplayProps {
  contacts: Contact[];
  username: string;
  handleLogout: () => void;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ contacts, username, handleLogout }) => {
  return (
    <div>
      <div>
        <p>{username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>Your Contacts</h2>
      </div>
      {contacts.map((contact, index) => (
        <div key={index}>
          {contact.name} {contact.number}
        </div>
      ))}
    </div>
  );
};

export default ContactDisplay;
