
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
import MyButton from "./MyButton";



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
            layouttype: 5,
            ALEJESTEMZDENERWOWANY: false,
            selected: []
        };
        this.toasted = this.toasted.bind(this)
        this.switchlayout = this.switchlayout.bind(this)
        this.goToCamera = this.goToCamera.bind(this)
        this.goToPreview = this.goToPreview.bind(this)
        this.select = this.select.bind(this)
    }
    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        console.log(status);


        if (status !== 'granted') {
            ToastAndroid.showWithGravity(
                'BRAK UPRAWNIEŃ',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

        } else {
            this.updateGallery()

        }
        status = await Camera.requestCameraPermissionsAsync();
        console.log(status.status);
        this.setState({ hasCameraPermission: status.status == 'granted' });

    }
    updateGallery = async () => {
        let albumik = await MediaLibrary.getAlbumAsync("DCIM")
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            album: albumik
        })
        //console.log(JSON.stringify(obj, null, 4));
        let map = obj.assets.map(result => {
            //console.log(result);
            return result
        });
        //console.log(map);
        this.setState({ items: map, ALEJESTEMZDENERWOWANY: true })
        this.forceUpdate()
        console.log(this.state.items[0].uri);
    }
    takephoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            alert(JSON.stringify(asset, null, 4))
        }
    }
    switchlayout() {
        if (this.state.layouttype == 5)
            this.setState({ layouttype: 1 })
        else
            this.setState({ layouttype: 5 })
    }
    deleteSelected = async () => {
        await MediaLibrary.deleteAssetsAsync(this.state.selected);
        this.updateGallery();
    }
    goToCamera() {
        this.props.navigation.navigate("CameraScreen", { func: this.updateGallery })
        //this.props.navigation.navigate("Main")
        //this.props.navigation.navigate("s2")
    }
    toasted() {
        ToastAndroid.showWithGravity(
            'wznoszę toast za camApp',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
    goToPreview(uriprop, idprop) {
        this.props.navigation.navigate("BigPhoto", { func: this.updateGallery, uri: uriprop, id: idprop })
    }
    select(id) {
        if (this.state.selected.includes(id)) {
            let temp = this.state.selected
            temp.splice(temp.indexOf(id), 1);
            this.setState({ selected: temp })
            console.log(this.state.selected);
        } else {
            let temp = this.state.selected
            temp.push(id)
            this.setState({ selected: temp })
            //console.log(this.state.selected);

        }
    }


    render() {
        let images = this.state.items.map(result => {
            return <Image style={styles.photo} source={{ uri: result.uri }}></Image>
        });
        console.log("no poszło");
        console.log(this.state.items[0]);
        //if (typeof this.state.items[0].uri != undefined) {
        //    console.log("no ja nie moge");
        //}

        if (this.state.ALEJESTEMZDENERWOWANY) {
            console.log(this.state.items[0].uri)
            console.log("NOJANIEMOGE");
            return (
                < View style={styles.main} >
                    <View style={styles.top} >
                        <MyButton
                            func={this.deleteSelected}
                            title={"Delete Selected"}
                            size={5}
                        ></MyButton>
                        <MyButton
                            func={this.switchlayout}
                            title={"Change Layout"}
                            size={5}
                        ></MyButton>
                        <MyButton
                            func={this.goToCamera}
                            title={"Go to Camera"}
                            size={5}
                        ></MyButton>
                    </View>
                    <View style={styles.bottom} >
                        <FlatList style={styles.bottom}
                            key={this.state.layouttype}
                            numColumns={this.state.layouttype}
                            data={this.state.items}
                            renderItem={({ item }) =>
                                <FotoItem
                                    id={item.id}
                                    uri={item.uri}
                                    func={this.goToPreview}
                                    func2={this.select}
                                    siz={this.state.layouttype}
                                    selected={this.state.selected.includes(item.id)}
                                ></FotoItem>

                            }
                            keyExtractor={item => item.id}
                        />


                    </View>
                </View >
            );
        } else {

            return (
                <View style={styles.main}>
                    <View style={styles.top} ><MyButton
                        func={this.deleteSelected}
                        title={"Delete Selected"}
                        size={5}
                    ></MyButton>
                        <MyButton
                            func={this.switchlayout}
                            title={"Change Layout"}
                            size={5}
                        ></MyButton>
                        <MyButton
                            func={this.goToCamera}
                            title={"Go to Camera"}
                            size={5}
                        ></MyButton></View>
                    <View style={styles.bottom} >
                        <View style={{ flex: 1 }}>


                            <ActivityIndicator size={69} color="#0000ff" />



                        </View>
                    </View>
                </View>
            );
        }

    }

}
const styles = {
    main: {
        flex: 1,
        flexDirection: "column",
    },
    top: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    bottom: {
        flex: 5,
        flexDirection: "row",
        flexWrap: "wrap"
    }
}



export default Main;