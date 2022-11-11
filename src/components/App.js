import "../css/App.css";
import { useState, useEffect } from 'react';
import ListContacts from "./ListContacts";
import CreteContact from "./CreateContact";
import * as ContactsAPI from '../utils/ContactsAPI';

const App = () => {
  const removeContact = (contact) => {
    ContactsAPI.remove(contact);
    setContacts(contacts.filter(c => c.id !== contact.id))
  }

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, [])

  return (
    <div>
      <ListContacts contacts={contacts} onDeleteContact={removeContact} />
      <CreteContact />
    </div>
  )
};

export default App;
