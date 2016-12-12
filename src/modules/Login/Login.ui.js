import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginUsername, loginPassword, openUserList, closeUserList } from './Login.action'
import { loginWithPassword } from './Login.middleware'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { InputGroup, Input, Button } from 'native-base'

import t from '../../lib/LocaleStrings'

import CachedUsers from '../CachedUsers/CachedUsers.ui'

import Dimensions from 'Dimensions'
const { width, height } = Dimensions.get('window')

class Login extends Component {

  submit = () => {
    this.props.dispatch(loginWithPassword(this.props.username, this.props.password))
  }

  changeUsername = (username) => {
    this.props.dispatch(loginUsername(username))
  }

  changePassword = (password) => {
    this.props.dispatch(loginPassword(password))
  }

  showCachedUsers = () => {
    this.props.dispatch(openUserList())
  }

  hideCachedUsers = () => {
    this.props.dispatch(closeUserList())
  }

  render () {
    var cUsers = function() {
      if (this.props.showCachedUsers) {
        return (<CachedUsers  style={style.noflex}/>)
      } else {
        return null
      }
    }.bind(this)
    return (
      <View style={style.container}>

        <InputGroup borderType='regular' style={style.inputGroup} >
          <Input
            ref='loginUsername'
            placeholder={t('fragment_landing_username_hint')}
            style={style.input}
            onChangeText={this.changeUsername}
            value={this.props.username}
            returnKeyType={'next'}
            onSubmitEditing={e => this.refs.password._textInput.focus()}
            selectTextOnFocus
            onFocus={this.showCachedUsers}
            onBlur={this.hideCachedUsers}
        />
        </InputGroup>

        {cUsers()}
        <InputGroup borderType='regular' style={style.inputGroup} >
          <Input
            ref='password'
            placeholder={t('fragment_landing_password_hint')}
            style={style.input}
            secureTextEntry
            onChangeText={this.changePassword}
            value={this.props.password}
            blurOnSubmit
            onSubmitEditing={this.submit}
          />
        </InputGroup>

        <TouchableOpacity style={style.button} onPress={this.submit}>
          <Text style={style.buttonText}> Sign In </Text>
        </TouchableOpacity>


      </View>
    )
  }
}

const style = StyleSheet.create({
  noflex: {
    flexShrink: 1
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: width * 0.7
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80C342',
    height: 45,
    marginVertical: 3
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    flex: 1
  },

  inputGroup: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginVertical: 3,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    borderColor: '#666'
  },

  input: {
    color: '#FFF',
    fontSize: 14
  }

})

export default connect(state => ({

  username: state.login.username,
  password: state.login.password,
  showCachedUsers: state.login.showCachedUsers,
  pin: state.login.pin

}))(Login)