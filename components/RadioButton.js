
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: 0
        };
        console.log("Content")
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        //this.props.func()
        console.log(this.props.val);
        console.log(this.props.func);
        this.props.func(this.props.val)
    }
    componentDidMount() {
        this.setState({ pressed: this.props.pressed })
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handleClick} style={{ flex: 1, justifyContent: "center" }}>
                <View style={{
                    borderWidth: 2,
                    borderColor: '#BDBDBD',
                    border: "solid",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}

                ><View style={{
                    margin: 5,
                    borderWidth: 2,
                    borderColor: '#BDBDBD',
                    backgroundColor: '#BDBDBD',
                    border: "solid",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90%",
                    width: "90%"
                }}
                    opacity={this.props.pressed}

                ></View></View>

            </TouchableOpacity>
        );
    }
}
//CircleButton.propTypes = {
//    func: PropTypes.func.isRequired,
//};
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
export default RadioButton;