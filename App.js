
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image, FlatList, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';

//import MyButton from './MyButton';
import { AsyncStorage } from "react-native"
//import Listitem from './ListItem';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";



class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      items: [],
      boolik: false,
      perm: false,
      isloading: false,
      any: false
    };
    this.abc = this.abc.bind(this);
  }
  componentDidMount = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('brak uprawnień do czytania image-ów z galerii')
      this.abc()
    }
  }
  abc = async () => {
    let obj = await MediaLibrary.getAssetsAsync({
      first: 100,           // ilość pobranych assetów
      mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
    })

    alert(JSON.stringify(obj.assets, null, 4))
  }

  render() {
    return (
      <Text></Text>
    );
  }
}

export default Main;