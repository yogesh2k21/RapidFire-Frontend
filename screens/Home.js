import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Background from "../components/Background";
import Btn from "../components/Btn";
// import { darkGreen } from "./Constants";

const Home = ({navigation}) => {
  return (
    <>
      <Background>
        <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
          <Text style={{ color: "white", fontSize: 64 }}>Let's start</Text>
          <Text style={{ color: "white", fontSize: 64, marginBottom: 40 }}>
            The test
          </Text>
          <Btn
            bgColor={'#2BB789'}
            textColor="white"
            btnLabel="Login"
            press={() => navigation.navigate("Login")}
          />
          <Btn
            bgColor="white"
            textColor={'#2BB789'}
            btnLabel="Signup"
            press={() => navigation.navigate("Signup")}
          />
        </View>
      </Background>
    </>
  );
};

export default Home;
