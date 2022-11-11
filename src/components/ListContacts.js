import PropTypes from "prop-types";
import { useState } from 'react';

const ListContacts = ({ contacts, onDeleteContact, onNavigate }) => {
  const [query, setQuery] = useState('');
  const updateQuery = (query) => {
    setQuery(query.trim());
  }
  const showingContacts = query === "" ? contacts : contacts.filter((c) => c.name.toLowerCase ().includes(query.toLowerCase()));
  const resetQuery = () => (setQuery(''));

  return (
    <div className="list-contacts">
      <div className ="list-contacts-top">
        <input
          className={"search-contacts"}
          type={"text"}
          placeholder={"Search contacts"}
          value={query}
          onChange = {(e) => updateQuery(e.target.value)}
        />
        <a href='#create' onClick={onNavigate} className={'add-contact'}>
          Add contact
        </a>
      </div>

      {
        showingContacts.length !== contacts.length && (
          <div className={"showing-contacts"}>
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={() => resetQuery('')}>Show all</button>
          </div>
        )
      }

      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div className={"contact-avatar"} style={{backgroundImage: `url(${contact.avatarURL})`,}}/>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.handle}</p>
            </div>
            <button className="contact-remove" onClick={() => onDeleteContact(contact)}>Remove</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

// eslint-disable-next-line react/no-typos
ListContacts.PropTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts;
