
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image, FlatList, Alert, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';

import CircleButton from './CircleButton';
import { AsyncStorage } from "react-native"
//import Listitem from './ListItem';
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { Camera } from "expo-camera";
import FotoItem from "./FotoItem";
import RadioButton from "./RadioButton";



class RadioGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.pass = this.pass.bind(this)
    }
    pass(val) {
        console.log("b");
        this.props.func(val)
    }

    render() {
        console.log("passed")
        console.log(this.props.vall)
        return (
            < View style={{ paddingTop: 0, flexDirection: 'column' }} >


                <FlatList
                    data={this.props.tab}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}><View style={{ width: Dimensions.get("window").width / 10, height: Dimensions.get("window").width / 10 }}><RadioButton func={this.pass} val={item.val} pressed={this.props.vall == item.val ? 1 : 0}></RadioButton></View><View style={{ justifyContent: 'center', paddingLeft: 10 }}><Text>{item.name}</Text></View></View>
                    }
                    keyExtractor={item => item.id}
                />




            </View >
        );


    }

}




export default RadioGroup;