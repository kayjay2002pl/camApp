
import React, { Component } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Content")
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.props.navigation.navigate("Gallery")
    }

    render() {
        return (
            <TouchableOpacity style={styles.main} onPress={this.handleClick}></TouchableOpacity>
        );
    }
}

const styles = {
    main: {

        flex: 1,

    }
}
export default Main;