import React from 'react';
import type { Contact } from '@shared/types';

interface ContactDisplayProps {
  contacts: Contact[];
  username: string;
  handleLogout: () => void;
}

interface ContactComponentProps {
  contact: Contact;
}

const ContactComponent: React.FC<ContactComponentProps> = ({ contact }) => {
  return (
    <div>
      {contact.name} {contact.number}
    </div>
  )
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ contacts, username, handleLogout }) => {
  return (
    <div>
      <div>
        <p>{username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>Your Contacts</h2>
      </div>
      {contacts.map(contact => (
        <ContactComponent key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactDisplay;
