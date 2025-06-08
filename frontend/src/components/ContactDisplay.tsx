import React from 'react';
import type { Contact } from '@shared/types';

interface ContactDisplayProps {
  contacts: Contact[];
  username: string;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ contacts }) => {
  return (
    <div>
      <h2>Your Contacts</h2>
      {contacts.map((contact, index) => (
        <div key={index}>
          {contact.name} {contact.number}
        </div>
      ))}
    </div>
  );
};

export default ContactDisplay;
