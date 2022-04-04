import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import NewOrderPopup from "../../NewOrderPopup";

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyA7q0zF_2_rCjVuhRDn52NtkOcM3K7t53k";

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  return (
    <View>
      <MapView
        style={{ width: "100%", height: Dimensions.get("window").height - 150 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 5.636052,
          longitude: -0.186665,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
        />
      </MapView>

      <Pressable
        onPress={() => console.warn("Balance")}
        style={styles.balanceButton}
      >
        <Text style={styles.balanceText}>
          <Text style={{ color: "green" }}>$</Text> 0.00
        </Text>
      </Pressable>
      <Pressable
        onPress={() => console.warn("Hey")}
        style={[styles.roundButton, { top: 10, left: 10 }]}
      >
        <Icon name="menu" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable
        onPress={() => console.warn("Hey")}
        style={[styles.roundButton, { top: 10, right: 10 }]}
      >
        <Icon name="menu" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable
        onPress={() => console.warn("Hey")}
        style={[styles.roundButton, { bottom: 110, left: 10 }]}
      >
        <Icon name="menu" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable
        onPress={() => console.warn("Hey")}
        style={[styles.roundButton, { bottom: 110, right: 10 }]}
      >
        <Icon name="menu" size={24} color="#4a4a4a" />
      </Pressable>
      <Pressable onPress={onGoPress} style={styles.goButton}>
        <Text style={styles.goText}>{isOnline ? "END" : "GO"}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Icon name="options" size={30} color="#4a4a4a" />

        {isOnline ? (
          <Text style={styles.bottomText}>You're online</Text>
        ) : (
          <Text style={styles.bottomText}>You're offline</Text>
        )}

        <Icon name="menu" size={30} color="#4a4a4a" />
      </View>

      <NewOrderPopup/>
    </View>
  );
};

export default HomeScreen;
