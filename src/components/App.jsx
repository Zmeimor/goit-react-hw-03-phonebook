import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Form } from "./Form";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export class  App extends Component {
  
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

// componentDidUpdate(prevProps, prevState){
  
//   if (this.state.contacts !== prevState.contacts) {
//     localStorage.setItem('contacts',JSON.stringify(this.state.contacts));
//   }
// };

  formSubmitHandler = data => {
    const searchSameName = this.state.contacts
    .map((cont) => cont.name)
    .includes(data.name);

    if (searchSameName) {
      alert(`${data.name} is already in contacts`);
    } else if (data.name.length === 0) {
      alert("Fields must be filled!");
    } else {
    const contact = {
      ...data,
      id:nanoid()
    };
      
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
    }) 
      );
    }
    };

    changeFilter = (filter) => {
      this.setState({ filter });
    };
  
    getVisibleContacts = () => {
      const { contacts, filter } = this.state;
  
      return contacts.filter((contacts) =>
        contacts.name.toLowerCase().includes(filter.toLowerCase())
      );
    };
  
    removeContact = (contactId) => {
      this.setState((prevState) => {
        return {
          contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        };
      });
    };

    componentDidMount() {
      const contactsList = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contactsList);
  
      if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
      }
    }
  
    componentDidUpdate(prevState) {
  
      if (this.state.contacts !== prevState.contacts) {
        console.log('contacts were updated');
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }
  

 render () {
  const { filter } = this.state;

  const visibleContacts = this.getVisibleContacts();
  
  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <h1>Phonebook</h1>
      <>
      <Form onSubmit = {this.formSubmitHandler}/>
      <h2>Contacts</h2>
        {visibleContacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </>
    </div>
  );
    }
};
