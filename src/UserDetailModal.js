import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import { BarLoader } from 'react-spinners';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import UserDetail from './UserDetail';

class UserDetailModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
            user: null,
            loading: false,
            error: false,
            errorMsg: '',
          };
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch(this.props.apiurl) // Simulate getting details from a user selected
    .then((resp) => resp.json())
    .then((user) => this.setState({user: user.results, loading: false}))
    .catch((error) => this.setState({error: true, errorMsg: error.error, loading: false}));
  }

  handleClose() {
    this.props.handleClose();
  }

  render() {
    if (this.state.error) {
      return (
        <Alert bsStyle="danger">
          <strong>Ups...</strong> something went wrong ({this.state.errorMsg})
        </Alert>
      )
    }
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>User Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                (this.state.user) ? <UserDetail details={this.state.user[0]}/>
                                   : <BarLoader color = {'#123abc'} loading = {this.state.loading} />
            }
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UserDetailModal;
