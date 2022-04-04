import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    position: "absolute",

    bottom: 0,
    width: "100%",
    padding: 20,
    height: 250,
  },
  popupContainer: {
    backgroundColor: "black",
    flex: 1,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'space-around'


  },
  minutes: {
    color: "lightgrey",
    fontSize:30,
  },
  distance: {
    color: "lightgrey",
    fontSize:26,
  },
  uberType:{
      color:"lightgrey",
      fontSize:20,
      marginHorizontal:10,
  },
  row:{
      flexDirection:'row',
      alignItems:'center'
  },
  userBg:{
      backgroundColor:'#008bff',
      width:60,
      height:60,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:60,
  }

});

export default styles;
