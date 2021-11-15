
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class CircleButton extends Component {
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
            <TouchableOpacity onPress={this.handleClick} style={{ height: 100, justifyContent: "center" }}>
                <View style={{
                    margin: 5,
                    borderWidth: 1,
                    borderColor: '#BDBDBD',
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    width: this.props.size,
                    height: this.props.size
                }}

                ><Text>{this.props.title}</Text></View>

            </TouchableOpacity>
        );
    }
}
CircleButton.propTypes = {
    title: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
};
const styles = StyleSheet.create({
    butt: {

        margin: 5,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        padding: 5,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"


    }
})
export default CircleButton;