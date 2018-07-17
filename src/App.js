import React, { Component } from 'react';
import MenuHeader from './MenuHeader';
import UserTable from './UserTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.usersItemMenuClicked = this.usersItemMenuClicked.bind(this);
    this.state = {
          userTableClicked : false
    };
    this.apiurl = 'https://randomuser.me/api/';
 }

  render() {
    return (
      <div>
        <MenuHeader usersItemMenuClicked={this.usersItemMenuClicked}/>
        {
          this.state.userTableClicked ?
            <UserTable apiurl={this.apiurl}/>
            :
            'Please, use the Users menu...'
        }
      </div>
    );
  }

  usersItemMenuClicked() {
    this.setState({userTableClicked : true});
  }
}

export default App;
