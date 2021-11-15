import React, { Component } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import PropTypes from 'prop-types';
import * as MediaLibrary from "expo-media-library";
import MyButton from './MyButton';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Content")
        this.delete = this.delete.bind(this)
    }
    delete = async () => {
        await MediaLibrary.deleteAssetsAsync(this.props.route.params.id);
        await this.props.route.params.func()
        this.props.navigation.navigate("Gallery")
    }
    share() {
        this.props.navigation.navigate("Gallery")
    }
    componentDidMount() {
        Image.getSize(this.props.route.params.uri, (width, height) => { this.setState({ width, height }) });
    }
    render() {

        console.log(this.state);
        return (
            <View style={styles.main}>

                <View style={{ width: "90%", height: "70%", borderRadius: 10 }}><ImageBackground style={{ width: "100%", height: "100%", borderRadius: 20, justifyContent: 'flex-end', alignItems: "flex-end" }} source={{ uri: this.props.route.params.uri }}><Text style={{ color: "white", fontSize: 36 }}>{this.state.height}x{this.state.width}</Text></ImageBackground></View>
                <View style={{ width: "90%", height: "20%", borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <MyButton
                        func={this.delete}
                        title={"DELETE"}
                        size={5}
                    >

                    </MyButton>
                    <MyButton
                        func={this.share}
                        title={"SHARE"}
                        size={5}
                    >

                    </MyButton>
                </View>
            </View>
        );
    }
}

const styles = {
    main: {

        flex: 1,
        jusifyContent: "center",
        alignItems: 'center',
        padding: 10,

    }
}
export default Main;