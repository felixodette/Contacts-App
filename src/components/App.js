import "../css/App.css";
import { useState, useEffect } from 'react';
import { Route, Routes } from  'react-router-dom';
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactsAPI from '../utils/ContactsAPI';

const App = () => {
  const removeContact = (contact) => {
    ContactsAPI.remove(contact);
    setContacts(contacts.filter(c => c.id !== contact.id))
  }

  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat([res]));
    }
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
    <Routes>
      <Route exact path='/' element={
        <ListContacts contacts={contacts} onDeleteContact={removeContact} />
      }/>
      <Route path={'/create'} element={<CreateContact />} />
    </Routes>
  )
};

export default App;
