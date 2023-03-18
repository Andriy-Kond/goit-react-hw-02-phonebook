import PropTypes from 'prop-types';
import css from './Contacts.module.css';

function MarkupContacts(userName, userNumber, id, deleteContact) {
  return (
    <li className={css.listItem} key={id}>
      {userName}: {userNumber}
      <button className={css.deleteBtn} onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
}

export const Contacts = ({ contacts, deleteContact, filter }) => {
  return (
    <ul className={css.list}>
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

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      userName: PropTypes.string,
      userNumber: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
  filter: PropTypes.string,
};
