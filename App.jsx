import React, { PureComponent } from 'react';
import { getUsers } from './service';

export default class App extends PureComponent {
  defaultDomainIndex = 0;
  domains = [
    'all',
    '.biz',
    '.tv',
    '.net',
    '.org',
    '.ca',
    '.info',
    '.me',
    '.io',
  ];

  state = {
    users: [],
    filteredList: [],
    filter: this.domains[this.defaultDomainIndex],
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const users = await getUsers();
    this.setState({ users });
  }

  listUsers(users) {
    const filteredUser = this.state.filteredList;
    const randomTodos = Math.floor(users.length * Math.random());
    if(this.state.filter === 'all') {
    return (
      <ul>
        {users.map((user) => {
          return <li key={user.name}>{user.name} has completed {randomTodos} todos</li>;
        })}
      </ul>
    );
    } else {
        return (
          <ul>
            {filteredUser.map((user) => {
              return <li key={user.name}>{user.name} has completed {randomTodos} todos</li>;
            })}
          </ul>
        );
    }
  }

  handleChange(e) {
    const domain = e.target.value
    const filteredUsers = this.state.users.filter((ele) => ele.email.includes(domain))
    this.state.filter = domain;    
    this.setState({filteredList: filteredUsers});
  }

  renderDropDown() {
    return (
      <select onChange={this.handleChange}>
        {this.domains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>
    );
  }
  

  render() {
    const { users } = this.state;
    return (
      <>
        {this.renderDropDown()}
        {this.listUsers(users)}
      </>
    );
  }
}
