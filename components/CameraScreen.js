
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image, FlatList, Alert, Dimensions, Animated, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

import CircleButton from './CircleButton';
import { AsyncStorage } from "react-native"
//import Listitem from './ListItem';
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import { Camera } from "expo-camera";
import { BackHandler } from "react-native"
import RadioGroup from './RadioGroup';



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
            pos: new Animated.Value(Dimensions.get("window").height),
            camstate: 0,
            ratios: ["4:3", "16:9"],
            ratiostate: "16:9",
            sizes: [],
            sizestate: "1920x1080"
        };
        console.log(this.state.pos)
        this.isHidden = true
        this.backFront = this.backFront.bind(this)
        this.toggle = this.toggle.bind(this)
        this.set = this.set.bind(this)
        this.setr = this.setr.bind(this)
        this.sets = this.sets.bind(this)
    }
    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        console.log(status);
        console.log(this.state.pos)

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
        console.log(Camera.Constants.WhiteBalance)

        console.log(Object.entries(Camera.Constants.WhiteBalance).map(([key, v]) => {
            return { name: key, val: v }
        }))

    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }
    handleBackPress = () => {
        this.props.route.params.func()
        this.props.navigation.navigate("Gallery")
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
    toggle() {

        if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").height

        //animacja
        console.log(this.state.pos)
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 5,
                tension: 0,
                friction: 5,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
        this.getSizes()
    }
    set(val) {

        this.setState({ camstate: val })
    }
    setr(val) {

        this.setState({ ratiostate: val })
        this.getSizes()
    }
    getSizes = async () => {
        console.log("bbbbbb")
        if (this.camera) {
            const sizess = await this.camera.getAvailablePictureSizesAsync(this.state.ratiostate)
            let arr = sizess
            console.log(typeof arr);
            this.setState({ sizes: arr })
        }
    };
    sets(val) {
        this.setState({ sizestate: val })
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
                        whiteBalance={this.state.camstate}
                        pictureSize={this.state.sizestate}
                        ratio={this.state.ratiostate}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <Animated.View
                            style={[
                                styles.animatedView,
                                {
                                    transform: [
                                        { translateY: this.state.pos }
                                    ]
                                }]} >
                            <RadioGroup
                                tab={Object.entries(Camera.Constants.WhiteBalance).map(([key, v]) => {
                                    return { name: key, val: v }
                                })}
                                func={this.set}
                                vall={this.state.camstate}
                            ></RadioGroup>
                            <View style={{ width: "90%", height: 1, border: "solid", borderColor: "#BDBDBD", borderWidth: 1, marginBottom: 10 }}></View>
                            <RadioGroup
                                tab={this.state.ratios.map(result => {
                                    return { name: result, val: result }
                                })}
                                func={this.setr}
                                vall={this.state.ratiostate}
                            ></RadioGroup>
                            <View style={{ width: "90%", height: 1, border: "solid", borderColor: "#BDBDBD", borderWidth: 1, marginBottom: 10 }}></View>
                            <RadioGroup
                                tab={this.state.sizes.map(result => {
                                    return { name: result, val: result }
                                })}
                                func={this.sets}
                                vall={this.state.sizestate}
                            ></RadioGroup>

                        </Animated.View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "flex-end", padding: 10, }}>
                            <CircleButton func={this.backFront} title={"⭯"} size={50}></CircleButton>
                            <CircleButton func={this.takephoto} title={"+"} size={100}></CircleButton>
                            <CircleButton func={this.toggle} title={"⭯"} size={50}></CircleButton>
                        </View>
                    </Camera>
                </View>
            );
        }
    }


}
var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(100, 100, 100, 0.8)',
        height: "100%",
        width: "65%",
        padding: 10,
        flexDirection: 'column',
    }
});

export default Main;