import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";




export const CeqSupToken =  "xxxx";

export const SingInAsync = async (apikey, username) => {
  try {
    const response = await fetch("https://apis.cequens.com/sms/v1/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({
        messageText: text,
        senderName: from,
        messageType: "text",
        clientMessageId: 0,
        acknowledgement: 0,
        recipients: to,
      }),
    });
    const json = await response.json();
    return json.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const sendSMSAsync = async (from, to, text, Token) => {
  const response = await fetch("https://apis.cequens.com/sms/v1/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      messageText: text,
      senderName: from,
      messageType: "text",
      clientMessageId: 0,
      acknowledgement: 0,
      recipients: to,
    }),
  });
  const json = await response.json();
  console.log(json);
  return json.data.SentSMSIDs[0].SMSId;
};

export const getPermissionReadSMS = async () => {
    const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS);
      if (isGranted) {
        console.log("Permission already granted for read sms ");
      }else {
        console.log("no permission granted tell now for read sms")
      }
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
    title: "READ SMS",
    message: "Need to read sms",
    buttonNeutral: "Ask Me Later",
    buttonPositive: "OK",
    buttonNegative: "Cancel"
  });
  console.log("granted === PermissionsAndroid.RESULTS.GRANTED  ", granted === PermissionsAndroid.RESULTS.GRANTED);
}

export const getPermissionReceiveSMS = async () => {
    const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
    if (isGranted) {
      console.log("Permission already granted for receive sms ");
    }else {
      console.log("no permission granted tell now for receive sms")
    }
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
    title: "Receive SMS",
    message: "Need access to receive sms, to verify OTP",
    buttonNeutral: "Ask Me Later",
    buttonPositive: "OK",
    buttonNegative: "Cancel"
  });
  console.log("granted === PermissionsAndroid.RESULTS.GRANTED  ", granted === PermissionsAndroid.RESULTS.GRANTED); 
}