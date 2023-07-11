import React, { Component } from 'react';
import './ContactForm.css';


class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { selectedContact } = this.props;
    if (selectedContact !== prevProps.selectedContact) {
      if (selectedContact) {
        const { firstName, lastName, email, phone } = selectedContact;
        this.setState({
          firstName,
          lastName,
          email,
          phone,
        });
        this.inputRef.current.focus();
      } else {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = this.state;
    this.props.onSaveContact({ firstName, lastName, email, phone });
    this.props.onClearContact();
  };

  handleClear = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { firstName, lastName, email, phone } = this.state;
    const { selectedContact } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          ref={this.inputRef}
        />
        <input
          type="text"
          placeholder="Фамилия"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Телефон"
          name="phone"
          value={phone}
          onChange={this.handleChange}
        />
        <button type="submit">{selectedContact ? 'Save' : 'Add'}</button>
        {selectedContact && <button onClick={this.handleClear}>Clear</button>}
      </form>
    );
  }
}

export default ContactForm;
