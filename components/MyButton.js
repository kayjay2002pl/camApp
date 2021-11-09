
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("Content")
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.func()
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleClick}>
                <View style={styles.butt}><Text>{this.props.title}</Text></View>

            </TouchableOpacity>
        );
    }
}
MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
};
const styles = {
    butt: {

        margin: 5,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        padding: 5,
        borderRadius: 10,

    }
}
export default MyButton;