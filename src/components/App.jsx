import { Component } from 'react';
import { UserForm } from './UserForm/UserForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', userName: 'Rosie Simpson', userNumber: '459-12-56' },
      { id: 'id-2', userName: 'Hermione Kline', userNumber: '443-89-12' },
      { id: 'id-3', userName: 'Eden Clements', userNumber: '645-17-79' },
      { id: 'id-4', userName: 'Annie Copeland', userNumber: '227-91-26' },
    ],
    filter: '',
  };

  createUser = userData => {
    const isExist = this.state.contacts.find(contact => {
      return contact.userName === userData.userName;
    });
    isExist
      ? alert(`${userData.userName} is already in contacts`)
      : this.setState(prevState => {
          return { contacts: [...prevState.contacts, userData] };
        });
  };

  getInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  filterContacts = () => {
    this.state.contacts.filter(contact =>
      contact.userName.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <div className={css.mainContainer}>
        <h1>Phonebook</h1>
        <UserForm createUser={this.createUser}></UserForm>
        <h2>Contacts</h2>
        <Filter filter={filter} getInput={this.getInput}></Filter>
        <Contacts
          contacts={contacts}
          deleteContact={this.deleteContact}
          filter={filter}
        ></Contacts>
      </div>
    );
  }
}