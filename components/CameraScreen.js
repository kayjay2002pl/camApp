
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image, FlatList, Alert, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';

import CircleButton from './CircleButton';
import { AsyncStorage } from "react-native"
//import Listitem from './ListItem';
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { Camera } from "expo-camera";
import { BackHandler } from "react-native"



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            items: [],
            boolik: false,
            perm: false,
            isloading: false,
            any: false,
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
        this.backFront = this.backFront.bind(this)
    }
    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        console.log(status);


        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
            ToastAndroid.showWithGravity(
                'AAAAA',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

        }
        status = await Camera.requestCameraPermissionsAsync();
        console.log(status.status);
        this.setState({ hasCameraPermission: status.status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.route.params.func()
        this.props.navigation.goBack()
        return true;
    }
    takephoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            alert(JSON.stringify(asset, null, 4))
        }
    }
    backFront() {

        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1 }}>
                            <CircleButton func={this.takephoto} title={"+"} size={69}></CircleButton>
                            <CircleButton func={this.backFront} title={"⭯"} size={69}></CircleButton>
                        </View>
                    </Camera>
                </View>
            );
        }
    }

}

export default Main;