import React, { Component } from 'react';
import './ContactList.css';


class ContactList extends Component {
  render() {
    const { contacts, selectedContact, onEditContact, onDeleteContact } =
      this.props;
    return (
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => onEditContact(contact)}
            className={
              selectedContact && selectedContact.id === contact.id
                ? 'selected'
                : ''
            }
          >
            {contact.firstName} {contact.lastName}
            <button onClick={() => onDeleteContact(contact)}>×</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ContactList;
