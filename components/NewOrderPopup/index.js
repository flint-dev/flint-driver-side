import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

const NewOrderPopup = () => {
  return (
    <View style={styles.root}>
      <View style={styles.popupContainer}>
        <View style={styles.row}>
          <Text style={styles.uberType}>UberX</Text>
          <View style={styles.userBg}>
            <Icon name="person" size={35} color="white" />
          </View>
          <Text style={styles.uberType}>
            <Icon name="star" size={18} />5
          </Text>
        </View>
        <Text style={styles.minutes}>2 min</Text>
        <Text style={styles.distance}>0.2mi</Text>
      </View>
    </View>
  );
};

export default NewOrderPopup;
