
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: this.props.selected ? 0.8 : 0
        };
        console.log("Content")
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this)
    }
    handleClick() {
        console.log("AAAAAAA");
        this.props.func(this.props.uri, this.props.id)
    }
    handlePress() {
        this.props.func2(this.props.id)
    }
    componentDidMount() {
        //console.log("AAAAAAAAAAA");
    }

    render() {
        console.log(this.props.selected);
        return (
            <TouchableOpacity style={{
                width: Dimensions.get("window").width / this.props.siz,
                height: Dimensions.get("window").width / 5,
                padding: 1,
                borderRadius: 10

            }} onPress={this.handleClick} onLongPress={this.handlePress}>
                <ImageBackground style={{
                    width: "100%",
                    height: "100%",

                }}
                    imageStyle={{ borderRadius: 10 }}
                    source={{ uri: this.props.uri }}
                >
                    <View style={{ backgroundColor: "lightgray", width: "100%", height: "100%", borderRadius: 10 }} opacity={this.props.selected ? 0.8 : 0}></View>
                </ImageBackground>

            </TouchableOpacity>
        );
    }
}
FotoItem.propTypes = {
    id: PropTypes.any.isRequired,
    func: PropTypes.func.isRequired,
    func2: PropTypes.func.isRequired,
    uri: PropTypes.string.isRequired,
    siz: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired
};
const styles = {
    //imagecon: {
    //    width: Dimensions.get("window").width / this.props.siz,
    //    height: Dimensions.get("window").width / this.props.siz

    //},
    //image: {
    //    width: Dimensions.get("window").width / this.props.siz,
    //    height: Dimensions.get("window").width / this.props.siz
    //}
}
export default FotoItem;