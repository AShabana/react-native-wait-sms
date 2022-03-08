import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import SmsListener from "react-native-android-sms-listener";

import * as Cequens from "./lib/cequens";

export default function App() {
  console.log("Starting the Appliation");
  const [inprogress, runSMS] = React.useState(false);
  const [msgID, setMsgID] = React.useState("");
  return (
    <View style={styles.container}>
      <Text>{ inprogress ? "Waiting SMS at device inbox" : "Start OTP Testing for single SMS" } </Text>
      <Button
        onPress={async () => {
          runSMS(true);
          const msgid = await Cequens.sendSMSAsync(
            "Cequens",
            "201003325373",
            "Text text shabana",
            Cequens.CeqSupToken
          );
          setMsgID(msgid);
          console.log(msgid);
          console.log("Start Requesting Permissions");
          await Cequens.getPermissionReceiveSMS();
          await Cequens.getPermissionReadSMS();
          console.log("End Requesting Permissions");
          SmsListener.addListener((message) => {
            console.log("Getting a new msg");
            console.info(message);
            runSMS(false);
          });
          
        }}
        title="Start"
        color="#841584"
        disabled={inprogress}
      />
      <Text>{msgID}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
