// import PropTypes from 'prop-types';
// import css from './Contacts.module.css' ;

function MarkupContacts(userName, userNumber, id, deleteContact) {
  return (
    <li key={id}>
      {userName}: {userNumber}
      <button onClick={() => deleteContact(id)}>Delete</button>
    </li>
  );
}

export const Contacts = ({ contacts, deleteContact, filter }) => {
  return (
    <ul>
      {filter
        ? contacts
            .filter(({ userName }) =>
              userName.toLowerCase().includes(filter.toLowerCase())
            )
            .map(({ userName, userNumber, id }) => {
              return MarkupContacts(userName, userNumber, id, deleteContact);
            })
        : contacts.map(({ userName, userNumber, id }) => {
            return MarkupContacts(userName, userNumber, id, deleteContact);
          })}
    </ul>
  );
};
