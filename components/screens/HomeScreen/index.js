import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import NewOrderPopup from "../../NewOrderPopup";

const origin = { latitude: 5.637268, longitude: -0.184888 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyA7q0zF_2_rCjVuhRDn52NtkOcM3K7t53k";

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);

  const [order, setOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    id: "1",
    type: "FlintX",
    originLatitude: 5.636052,
    originLongitude: -0.186665,

    destLatitude: 5.637268,
    destLongitude: -0.184888,

    user: {
      rating: 4.8,
      name: "Mann",
    },
  });

  const onDecline = () => {
    setNewOrder(null);
  };
  const onAccept = (newOrder) => {
    setOrder(newOrder);
    setNewOrder(null);
  };

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onUserLocationChange = (event) => {
    console.log("userlocatonchange")
    console.log(event.nativeEvent);

  };

  const renderBottomTitle = () => {
    if (order) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>1 min</Text>

            <View
              style={{
                backgroundColor: "#1e9203",
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Icon name="person" size={20} color="white" />
            </View>
            <Text>0.2 mi</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order.user.name} </Text>
        </View>
      );
    }
    if (isOnline) {
      return <Text style={styles.bottomText}>You're online</Text>;
    }
    return <Text style={styles.bottomText}>You're offline</Text>;
  };

  return (
    <View>
      <MapView
        style={{ width: "100%", height: Dimensions.get("window").height - 150 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 5.636052,
          longitude: -0.186665,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {order && (
          <MapViewDirections
            origin={origin}
            destination={{
              latitude: order.originLatitude,
              longitude: order.originLongitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
          />
        )}
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

        {renderBottomTitle()}

        <Icon name="menu" size={30} color="#4a4a4a" />
      </View>

      {newOrder && (
        <NewOrderPopup
          newOrder={newOrder}
          duration={2}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )}
    </View>
  );
};

export default HomeScreen;
