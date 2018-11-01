import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
// import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card } from '../components/common';

class Comunidade extends Component {
  render() {
    return (
      <Card style={{textAlign: 'center'}}>
        <Text>Comunidade</Text>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = () => {
//   const { email, password, error, loading } = auth;

//   return { email, password, error, loading };
	return {};
};

export default connect(mapStateToProps)(Comunidade);
