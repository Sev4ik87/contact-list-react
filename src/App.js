import React, { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      selectedContact: null,
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSaveContact = (contact) => {
    const { selectedContact, contacts } = this.state;
    if (selectedContact) {
      const updatedContacts = contacts.map((c) =>
        c.id === selectedContact.id ? contact : c
      );
      this.setState({
        contacts: updatedContacts,
        selectedContact: null,
      });
    } else {
      const newContact = { ...contact, id: Date.now() };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = () => {
    const { selectedContact, contacts } = this.state;
    if (selectedContact) {
      const updatedContacts = contacts.filter(
        (c) => c.id !== selectedContact.id
      );
      this.setState({
        contacts: updatedContacts,
        selectedContact: null,
      });
    }
  };

  handleEditContact = (contact) => {
    this.setState({ selectedContact: contact });
  };

  handleClearContact = () => {
    this.setState({ selectedContact: null });
  };

  handleNewContact = () => {
    this.setState({ selectedContact: null });
  };

  render() {
    const { contacts, selectedContact } = this.state;
    return (
      <div className="app">
        <div className="contacts-section">
          <h2>Список контактов</h2>
          <ContactList
            contacts={contacts}
            selectedContact={selectedContact}
            onEditContact={this.handleEditContact}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
        <div className="form-section">
          <h2>Форма добавления</h2>
          <ContactForm
            selectedContact={selectedContact}
            onSaveContact={this.handleSaveContact}
            onClearContact={this.handleClearContact}
          />
          <button onClick={this.handleNewContact}>New</button>
        </div>
      </div>
    );
  }
}

export default App;
