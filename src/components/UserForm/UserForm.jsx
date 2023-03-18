import PropTypes from 'prop-types';
import css from './UserForm.module.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';

export class UserForm extends Component {
  state = {
    name: '',
    number: '',
  };

  getInput = ({ target: { name, value } }) => {
    // для такого запису треба давати інпуту ту ж назву, що і у state: name="name"
    this.setState({ [name]: value });

    // Інакше доведеться кожен раз робити пошук потрібної властивості в об'єкті state.
    // Якщо властивість одна, то можна записати і так:
    // this.setState({ name: value }) ;
  };

  setName = e => {
    e.preventDefault();

    this.props.createUser({
      userName: this.state.name,
      userNumber: this.state.number,
      id: nanoid(),
    });
    // Очищення полів вводу форми після додавання нового контакту, або повідомлення, що контакт вже інсує:
    this.setState({ name: '', number: '' });
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
              // викликати колл-бек у стрілці потрібно лише якщо або щось дуже коротке.
              // Наприклад, таке: onChange={(e) => { console.log(e.target) }}
              // або коли у функцію треба передати значення
              // onChange={e => {
              //   this.getInput(e.target.value);
              // }}
              onChange={this.getInput}
              value={this.state.name}
            />
          </div>

          <div className={css.inputWrapper}>
            <label className={css.formLabel} htmlFor="userNumber">
              Phone Number
            </label>
            <input
              className={css.formInput}
              id="UserNumber"
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
