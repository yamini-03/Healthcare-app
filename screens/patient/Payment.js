import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput,Image, Button, Alert } from "react-native";
import { CardField, useConfirmPayment,createPaymentMethod } from "@stripe/stripe-react-native";
import card from "./../../assets/images/card.jpg"
import Icon from 'react-native-vector-icons/FontAwesome';
import { LogBox } from 'react-native';

//ADD localhost address of your server
const API_URL = "http://192.168.2.106:3000";

// const Payment = props => {
  export default function Payment({ route,navigation })  {
    LogBox.ignoreLogs(['Setting a timer']);

    // const { name, patdata, Slot, Disease, today, docdata} = route.params;

  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    // const pm = await createPaymentMethod({ type: "Card" });
     console.log("pm");
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
      cardDetails: cardDetails,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        // const amount= 2000;
        const { paymentIntent, error } = await confirmPayment(clientSecret,{
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
    navigation.navigate('Success'); 

  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> */}
      <Image source={card} style={{width:450, height:310,opacity:0.8}}/>
            <View style={{   width:'85%',
     borderRadius:30,
     marginTop:20,
     marginBottom:20,marginLeft: 26}}>
                {/* <Text style={styles.Maintext}>RazorPay Payment</Text> */}
                <View style={{ borderTopColor: '#c4c4c4',borderTopWidth: 1,width:320,alignSelf:"center"}}></View>
                <Text style={{fontSize:26, marginTop:4, color:'#fff', fontWeight:'bold',alignSelf:"center"}}>Payment Details</Text>
                <View style={{flexDirection:'row', marginTop:20,marginLeft:30}}>
                    <Icon name="envelope" size={20} color="#fff" style={{marginTop:5, marginRight:15}} />
                    <TextInput
                        style={{width: '85%',
                        alignSelf: "center",
                            fontSize: 15,
                            borderRightWidth: 0,
                            borderTopWidth: 0,
                           borderBottomWidth: 1,
                           borderLeftWidth: 0,
                           borderBottomColor: '#c4c4c4',
                          color: '#fff',
                          marginBottom: '3%',}}
                        placeholder='Email Address'
                        placeholderTextColor='#c4c4c4'
                        keyboardType='email-address'
                        autoCompleteType='email'
                        // value={Email}
                        onChangeText={(val) => setEmail(val)}
                    />                    
                </View>
            
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button style={{ width: '60%',
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#077395',
        borderRadius: 20,
        paddingTop:3,marginTop:30,fontSize: 20,color:'#fff',fontWeight:'bold',fontStyle: 'italic'}}
        onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
    </View>
  )
}
// export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#077395',
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    width:"30%",
  },
  cardContainer: {
    height: 50,
    
    marginVertical: 30,
  },
//   box:{
//     backgroundColor: '#fff',
//     height: 550,
//     width:'85%',
//     borderRadius:30,
//     marginTop:-30,
//     marginBottom:20,
//     alignItems: 'center',
// },
// Maintext: {
//     fontSize: 23,
//     color:'#077395',
//     fontWeight:'bold',
//     fontStyle: 'italic',
//     marginTop:20,
//     marginBottom:30,
// },
// nameinput: {
//     width: '70%',
//     alignSelf: "center",
//     fontSize: 15,
//     borderRightWidth: 0,
//     borderTopWidth: 0,
//     borderBottomWidth: 1,
//     borderLeftWidth: 0,
//     borderBottomColor: '#c4c4c4',
//     color: 'gray',
//     marginBottom: '3%',
// },
// textstyle:{
//     marginRight:10,
//     fontSize:16,
//     color:'#077395',
//     fontWeight:'bold',
// },

});
