import { View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Btn from "./Btn";
import { darkGreen, IP } from "./Constants";
import Field from "./Field";
import Background from "./Background";
import flush from "./Flush";
import { AsyncStorage } from "react-native";

// ws://localhost:8000/ws/awsc/room/FJ9UAT/?token=f167acf27b2ad70f45aef04f62aca144dd7cd395

export default function LandingPage({ navigation }) {
  const [roomID, setRoomID] = useState("");
  const [value, setValue] = useState(null);
  const URL = "ws://" + IP + ":8000/ws/awsc/room/";
  const data = [
    { label: "Automatic Quiz", value: "1" },
    { label: "Custom Quiz", value: "2" },
  ];

  const validateData = () => {
    if ( roomID.trim() === "") {
      flush("Fields are Empty", "warning");
      return false;
    }
    return true;
  };

  const ws = useRef({});

  const socketEvents = () => {
    console.log("Use effect run");
    ws.current.onopen = () => {
      console.log("Connection built");
      navigation.navigate("TestPage", {ws: ws, roomID : roomID});
    };

    ws.current.onmessage = (e) => {
      console.log("\nLanding Page OnMassege \n"+e.data);
    };

    ws.current.onerror = (e) => {
      // an error occurred
      flush("Invalid Room ID", "warning");
      console.log("onError Landing Page :"+e.message);
    };

    ws.current.onclose = (e) => {
      // connection closed
      console.log("onClose Landing Page :",e.code, e.reason);
    };
  };

  useEffect(socketEvents, []);

  const handleSocket = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      
      const customURL = URL + roomID + "/?token=" + token;
      
      const fullURL= customURL;
      console.log(fullURL);
      ws.current = new WebSocket(fullURL);
      socketEvents();

    } catch (error) {
      console.log("WebError : " + error);
    }
  };

  return (
    <Background>
      <View style={{ alignItems: "center", width: 400, marginVertical: 200 }}>
        <Field
          placeholder="Enter Room ID"
          keyboardType="default"
          onChange={(e) => setRoomID(e.nativeEvent.text)}
        />
        <Btn
          textColor="white"
          bgColor={darkGreen}
          btnLabel="Enter Room"
          press={() => {
            validateData() && handleSocket();
          }}
        />
      </View>
    </Background>
  );
}
