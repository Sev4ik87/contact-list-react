import React, { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';


class App extends Component {
 state = {
contacts: [],
contactForEdit: this.createEmptyContact(),

 };

 createEmptyContact() {
  return {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
    };
 }

saveState(contacts)
{
  localStorage.setItem('contacts',JSON.stringify(contacts))

}
restoreState(){
  const data = localStorage.getItem('contacts');
  return data ? JSON.parse(data): [];
}

 componentDidMount() {
this.setState({
contacts: this.restoreState(),
});
 }

deleteContact  = (id) => {
this.setState((state) => {
 const contacts = [
    ...state.contacts.filter((contact) => contact.id !== id),
];
this.saveState(contacts);
return {
  contacts,
  contactsForEdit:[],
}
});
}

saveContact= (contact) => {
  if (!contact.id){
    this.createContact(contact);
  }else {
    this.updateContact(contact);
  }
};

addNewContact = ()=> {
this.setState({
contactForEdit:this.createEmptyContact(),
});
}

selectContact = (contact) => {
this.setState({
  contactForEdit:contact,
})
};

createContact(contact) {
  contact.id = Date.now();
  this.setState((state)=>{
    const contacts = [...state.contacts,contact];
    this.saveState(contacts);
    return {
      contacts,
      contactForEdit: this.createEmptyContact(),

    };
  });
}

updateContact(contact){
  this.setState((state) => {
    const contacts = state.contacts.map((item) =>
    item.id === contact.id? contact : item
    );
    this.saveState(contacts);
    return {
      contacts,
      contactForEdit: contact,
    };
  });
  }

  render() {
    return (
      <div className='container'>
        <h1 className='header'>Contact List</h1>
        <div className='main'>
          <ContactList
          contacts={this.state.contacts}
          onDelete={this.deleteContact}
          onAddContact={this.addNewContact}
          onEditContact={this.selectContact}
          />
          <ContactForm
          key={this.state.contactForEdit.id}
          contactForEdit={this.state.contactForEdit}
          onSubmit={this.saveContact}
          onDelete={this.deleteContact}
          />
        </div>
      </div>
    )
  }
}

export default App;
