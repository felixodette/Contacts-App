import "../css/App.css";
import { useState, useEffect } from 'react';
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from '../utils/ContactsAPI';

const App = () => {
  const removeContact = (contact) => {
    ContactsAPI.remove(contact);
    setContacts(contacts.filter(c => c.id !== contact.id))
  }

  const [contacts, setContacts] = useState([]);
  const [screen, setScreen] = useState('create');

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };
    getContacts();
  }, [])

  return (
    <div>
      {
        screen === 'list' && (<ListContacts contacts={contacts} onDeleteContact={removeContact} />)
      }
      {
        screen === 'create' && (<CreateContact />)
      }
    </div>
  )
};

export default App;
