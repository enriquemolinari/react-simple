import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';
import Alert from 'react-bootstrap/lib/Alert';
import { BarLoader } from 'react-spinners';
import Button from 'react-bootstrap/lib/Button';
import UserDetailModal from './UserDetailModal';

class UserTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
            users: [],
            loading: false,
            error: false,
            errorMsg: '',
            showModal: false
          };
  }

  bringUsers() {
    this.setState({loading: true});
    fetch(this.props.apiurl + '?results=10')
    .then((resp) => resp.json())
    .then((users) => this.setState({users: users.results, loading: false}))
    .catch((error) => this.setState({error: true, errorMsg: error.error, loading: false}));
  }

  componentDidMount() {
    this.bringUsers();
  }

  //Needed for bringing another 10 users if menu item is clicked after mounted
  componentWillReceiveProps() {
    this.bringUsers();
  }

  render() {
    console.log("render....");
    if (this.state.error) {
      return (
        <Alert bsStyle="danger">
          <strong>Ups...</strong> something went wrong ({this.state.errorMsg})
        </Alert>
      )
    }
    return (
      <div>
        <div>
          <BarLoader color = {'#123abc'} loading = {this.state.loading} />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Gender</th>
                <th>Name</th>
                <th>email</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((item, key) =>
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{item.gender}</td>
                    <td>{item.name.first} {item.name.last}</td>
                    <td>{item.email}</td>
                    <td><Button href="#" onClick={() => this.setState({showModal: true})}>More...</Button></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
      { (this.state.showModal) ?
        <div>
          <UserDetailModal
                  apiurl={this.props.apiurl}
                  show={this.state.showModal}
                  handleClose={() => this.setState({showModal: false})}/>
        </div>
        : ''
      }
      </div>
    );
  }
}

export default UserTable;
