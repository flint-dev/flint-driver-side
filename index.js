import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import NewOrderPopup from "../../NewOrderPopup";

const origin = { latitude: 5.658993, longitude: -0.186151 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyA7q0zF_2_rCjVuhRDn52NtkOcM3K7t53k";

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: "1",
    type: "FlintX",
    originLatitude: 5.658993,
    originLongitude: -0.171461,

    destLatitude: 5.658593,
    destLongitude: -0.186151,

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
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = (event) => {
    console.log("Direction FOund: ", event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };
  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  useEffect(() => {
    if (order && order.distance && order.distance < 0.2) {
      setOrder({
        ...order,
        pickedUp: true,
      });
    }
  }, [order]);

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
  
      return (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              width: 200,
              justifyContent: "center",
              padding:10
            }}
          >
            <Text style={{color:'white',fontWeight:'bold'}}>COMPLETE {order.type} </Text>
          </View>
          <Text style={styles.bottomText}>{order.user.name}</Text>
        </View>
      );
    }
    if (order && order.pickedUp) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{order.duration ? order.duration.toFixed(1) : "?"} min</Text>
            <View
              style={{
                backgroundColor: "#d41212",
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Icon name={"user"} color={"white"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : "?"} km</Text>
          </View>
          <Text style={styles.bottomText}>Dropping off {order.user.name}</Text>
        </View>
      );
    }
    if (order) {
      return (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{order.duration ? order.duration.toFixed(1) : "?"}min</Text>

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
            <Text>{order.distance ? order.distance.toFixed(1) : "?"} km</Text>
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
            origin={myPosition}
            onReady={onDirectionFound}
            destination={getDestination()}
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
