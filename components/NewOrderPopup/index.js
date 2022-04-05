import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

const NewOrderPopup = ({newOrder,onAccept,onDecline,duration,distance}) => {
  
  return (
    <View style={styles.root}>
      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>
      </Pressable>
      <Pressable style={styles.popupContainer} onPress={onAccept}>
        <View style={styles.row}>
          <Text style={styles.uberType}>{newOrder.type}</Text>
          <View style={styles.userBg}>
            <Icon name="person" size={35} color="white" />
          </View>
          <Text style={styles.uberType}>
            <Icon name="star" size={18} />
            {newOrder.user.rating}
          </Text>
        </View>
        <Text style={styles.minutes}>{duration} min</Text>
        <Text style={styles.distance}>{distance}</Text>
      </Pressable>
    </View>
  );
};

export default NewOrderPopup;
