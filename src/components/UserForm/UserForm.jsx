import PropTypes from 'prop-types';
import css from './UserForm.module.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';

export class UserForm extends Component {
  state = {
    name: '',
    number: '',
  };

  // Встановлення значень state
  getInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  setName = e => {
    e.preventDefault(); // Відміняю дію форми за замовчуванням

    // Виклик функції з App
    // Додаткова змінна потрібна для перевірки чи доданий контакти, чи ні. Якщо ні, то поля не очищуємо.
    const userName = this.props.createUser({
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    });

    // Очищення полів форми
    userName && this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.addUserForm} onSubmit={this.setName}>
        <div className={css.userFormWrapper}>
          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor="UserId">
              Name
            </label>
            <input
              className={css.formInput}
              id="UserId"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.getInput}
              value={this.state.name}
            />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor="number">
              Phone Number
            </label>
            <input
              className={css.formInput}
              id="number"
              onChange={this.getInput}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>

          <button className={css.submitBtn} type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

UserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};
