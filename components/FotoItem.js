
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Content")
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log("AAAAAAA");
        this.props.func()
    }
    componentDidMount() {
        //console.log("AAAAAAAAAAA");
    }

    render() {
        //console.log("AAAAAAAAAAA");
        return (
            <TouchableOpacity style={styles.imagecon} onPress={this.handleClick}>
                <Image style={styles.image}
                    source={{ uri: this.props.uri }}
                ></Image>

            </TouchableOpacity>
        );
    }
}
FotoItem.propTypes = {
    id: PropTypes.any.isRequired,
    func: PropTypes.func.isRequired,
    uri: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};
const styles = {
    imagecon: {
        width: Dimensions.get("window").width / 5,
        height: Dimensions.get("window").width / 5

    },
    image: {
        width: Dimensions.get("window").width / 5,
        height: Dimensions.get("window").width / 5
    }
}
export default FotoItem;