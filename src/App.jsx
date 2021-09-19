import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from './redux/contacts/contacts-actions'
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import './App.css';

class App extends Component {
  // componentDidUpdate(prevProps, prevState ) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   }
  // }

  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'))
  //   if (contacts !== null) {
  //     this.setState({
  //     contacts: contacts,
  //     })
  //   }
  // }
  
  render() {
    const list = this.props.contacts.filter(item => item.name.toLowerCase().includes(this.props.filter.toLowerCase()))
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onChange={ this.props.onAdd}/>
        <h2>Contacts</h2>
        <Filter onChange={this.props.onSearch}/>
        <ContactList props={list} onDelete={this.props.onDelete}/>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts.items,
    filter: state.contacts.filter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (e) => dispatch(action.addContact(e)),
    onDelete: (e) => dispatch(action.deleteContact(e)),
    onSearch: (e) => dispatch(action.searchContact(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
