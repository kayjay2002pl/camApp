import { Animated, StyleSheet, View, Text, Button, Dimensions } from "react-native";
import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(Dimensions.get("window").height),  //startowa pozycja y wysuwanego View
        };
        this.isHidden = true
        console.log(this.state.pos)
    }

    toggle() {

        if (this.isHidden) toPos = 0; else toPos = Dimensions.get("window").height

        //animacja

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
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <Text>ANIMATE ME!</Text>

                </Animated.View>

                <Button title="start" style={styles.button} onPress={() => { this.toggle() }} />

            </View>
        );
    }
}


var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        height: "100%",
        width: "50%"
    }
});

export default Test