import React, { Component } from 'react';

class UserDetail extends Component {

  render() {
    let details = this.props.details;
    return (
      <div>
        <p><img src={details.picture.thumbnail} alt="user fake face"/></p>
        <p><b>First Name: </b>{details.name.first}</p>
        <p><b>Last Name: </b>{details.name.last}</p>
        <p><b>Id: </b>{details.id.name} {details.id.value}</p>
        <p><b>Address: </b>{details.location.street} ({details.location.city} {details.location.state})</p>
        <p><b>Phone: </b>{details.phone}</p>
        <p><b>Cell: </b>{details.cell}</p>
      </div>
    );
  }
}

export default UserDetail;
