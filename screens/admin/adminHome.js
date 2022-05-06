import React,{useEffect} from "react";
import { StyleSheet,View, Image,Text,TouchableOpacity } from "react-native";
import { ScrollView,  } from "react-native-gesture-handler";
import PieChart from 'react-native-pie-chart';
// import BarChart from 'react-native-bar-chart';

import Footer from '../footer';

import { getAuth} from "firebase/auth";
import { getDatabase, ref, set,get, onValue,child,} from "firebase/database";
import { LogBox } from 'react-native';

import adminbg from '../../assets/images/adminbg.png';

import user1 from '../../assets/images/user.png';
import doctor from '../../assets/images/doctor.png';
import hosp from '../../assets/images/hospital.png';
import pstory from '../../assets/images/pstories.png';



export default function AdminHome({ route, navigation }) {
    const auth = getAuth();
    const db = getDatabase();

    const arr = [];



    LogBox.ignoreLogs(['Setting a timer']);

    const {bg, bgcount,bddata } = route.params;
    // console.log('bddataaa:', bddata,bdid);
    const idarr=[];
    const odarr=[];

    useEffect(() => {
        const dbRefb = ref(getDatabase());

            get(child(dbRefb, `Doctors/`)).then((snapshotdoc) => {
            if (snapshotdoc.exists()) {
            
                snapshotdoc.forEach(function(childSnapshotdoc) {
                    var docidd = childSnapshotdoc.key;
                    // console.log("docidd : "+ docidd); // output is    docidd :Doc1836
                    const starCountRefdoc = ref(db, 'Doctors/'+ docidd);
                    onValue(starCountRefdoc, (snapshotdoc1) => {
                        const data = snapshotdoc1.val();
                        arr.push(data);
                        // console.log('arr',arr);
                    }); 
                    // console.log('arr2',arr);
                });
                // console.log('arr3',arr);
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });

            get(child(dbRefb, `Organ_Donation/`)).then((snapshotb) => {
            if (snapshotb.exists()) {

                var bdname = snapshotb.key ;
                // console.log("bdname : "+ bdname); 
                snapshotb.forEach(function(childSnapshot) {
                    var patid = childSnapshot.key;
                    console.log("patid : "+ patid); 
                    childSnapshot.forEach(function(child1Snapshot) {
                        var odid = child1Snapshot.key;
                        console.log("odid : "+ odid); 
                            idarr.push(odid);
                            console.log("idarrrr : "+ idarr);
                            const reg = child1Snapshot.val();
                                console.log("reregarrg : "+ idarr);
                                reg.bid=odid;
                                console.log("new reggggggggggggggggggg",reg);
                                odarr.push(reg);
                                console.log('arrayyy',odarr);       
                     
                        
                    });

                });
                    
                  
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });
           

    });


    const ViewReq = () =>{
        navigation.navigate('ViewRequests',{
            arr,
        });
    }

    const view1 = () => {
        navigation.navigate('bdlist', {bddata });
    }


    const view2 = () => {
        navigation.navigate('odlist',{
            bddata:odarr,
        });
    }


    // const widthAndHeight = 150
    const widthAndHeight = 205
    const series = [400, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800','#FFC0CB','#EE82EE', '#DA70D6']
    

    // data can be one or two dimensional Array
    const widthAndHeight2 = 165
    const data = [10,23,43,9,25,45,54,72,70];
    const sliceColorod = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800','#FFC0CB','#EE82EE', '#DA70D6','#c4c4c4']
    const horizontalData = ['All', 'Concrea', 'Pancrea', 'Kidney', 'Heart','Lungs','SmallInterstine','Liver','Skin'];    
    
   

    return(
        <View>
            <ScrollView>
                <View style={styles.upper}>
                    <Image style={styles.bgimage} source={adminbg} />
                </View>

                <View>
                    <TouchableOpacity 
                    style={[styles.button1]}
                    onPress = {ViewReq}
                    >
                            <Text style={{fontSize:20,fontWeight: 'bold',color:'green',alignSelf: 'center'}}>Requests for Approval</Text>
                            {/* fontFamily:'italic' */}
                    </TouchableOpacity>
                </View>

                <View style={[styles.SquareShapeView, styles.elevation]}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:'5%',marginLeft:20,fontSize: 14, fontWeight: 'bold',color:'#646060'}}>Blood Donation Registrations</Text>
                        <TouchableOpacity 
                                onPress={view1}
                            >
                            <Text style={[styles.buttontext]}>View</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{flexDirection:'row'}}>
                        <PieChart
                        widthAndHeight={widthAndHeight}
                        series={bgcount}
                        sliceColor={sliceColor}
                        style={styles.piechart}
                        />
                        <View style={{flexDirection:'column',marginLeft:'4%',marginTop:'7%',}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#F44336',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>O+</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#2196F3',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>O-</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#FFEB3B',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>AB+</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#4CAF50',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>AB-</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#FF9800',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>A+</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#FFC0CB',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>A-</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#EE82EE',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>B+</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#DA70D6',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>B-</Text>
                            </View>
                        </View>
                    </View>
                    
                </View>


                <View style={[styles.SquareShapeView, styles.elevation]}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:'5%',marginLeft:20,fontSize: 14, fontWeight: 'bold'}}>Organ Donation Registrations</Text>
                        <TouchableOpacity 
                                onPress={view2}
                            >
                            <Text style={[styles.buttontext]}>View</Text>
                        </TouchableOpacity>
                    </View>
                    
                     <View style={{flexDirection:'row'}}>
                        <PieChart
                            widthAndHeight={widthAndHeight2}
                            series={data}
                            sliceColor={sliceColorod}
                            style={styles.piechart}
                            />
                            {/* 'All', 'Concrea', 'Pancrea', 'Kidney', 'Heart','Lungs','SmallInterstine','Liver','Skin' */}
                        <View style={{flexDirection:'column',marginLeft:'1%',marginTop:'7%',}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#F44336',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>All</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#2196F3',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Concrea</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#FFEB3B',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Pancrea</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#4CAF50',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Kidney</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#FF9800',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Heart</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#FFC0CB',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Lungs</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#EE82EE',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Interstine</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#DA70D6',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Liver</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={[styles.circle,{backgroundColor:'#c4c4c4',marginRight:'19%',marginTop:'7%'}]}></View>
                                <Text>Skin</Text>
                            </View>
                        </View>
                    </View>
                </View>




                <View style={styles.count1}>
                    <View style={styles.count2}>
                        <View style={styles.count3}>
                            <Image style={styles.countitem} source={user1} />
                            <Text style={{ fontSize: 16, }}>Our Users</Text>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>30 Crores</Text>
                        </View>
                        <View style={styles.count3}>
                            <Image style={styles.countitem} source={doctor} />
                            <Text style={{ fontSize: 16, }}>Our Doctors</Text>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>1 Lakh</Text>
                        </View>
                    </View>
                    <View style={styles.count2}>
                        <View style={styles.count3}>
                            <Image style={styles.countitem} source={hosp} />
                            <Text style={{ fontSize: 16, }}>Hospitals</Text>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>20,000</Text>
                        </View>
                        <View style={styles.count3}>
                            <Image style={styles.countitem} source={pstory} />
                            <Text style={{ fontSize: 16, }}>Patient Stories</Text>
                            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>40 Lakh</Text>
                        </View>
                    </View>
                </View>
              
                <Footer/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
   SquareShapeView: {
      width: 306,
      height: 272,
      marginLeft:'12%',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginTop:'-5%',
      marginBottom:'10%',
    },
  elevation:{
      elevation:10,
      shadowColor:'black',
    },
  buttontext:{
      marginTop:'15%',
      marginLeft:15, 
      fontSize: 14, 
      fontWeight: 'bold',
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingLeft:15,
      paddingRight:15,
      color:'#646060',
      
    },
    piechart:{
        marginTop:'5%',
        marginLeft:'8%',

    },
   
    button1:{
      width: 306,
      height: 100,
      marginLeft:'12%',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginTop:'5%',
      marginBottom:'7%',
      fontSize: 15, 
      fontWeight: 'bold',
      paddingLeft:15,
      paddingRight:15,
      elevation:10,
      shadowColor:'black',
      justifyContent: 'center',
    },
    bgimage:{
        width:'90%',
        height:309,
        marginTop:'10%',
        marginLeft:'5%',
         
    },
    count1:{
        flexDirection: 'column',
        marginTop:'8%',
    },
    count2:{
        flexDirection:'row'
    },
    count3: {
        width: '40%',
        height: 120,
        alignItems:'center',
        marginLeft: '7%',
        marginBottom: '5%',
    },
    countitem: {
        width: '28%',
        height: 45,
        marginTop: '3%',
        marginBottom: '8%'
    },
    circle:{
        width:10,
        height:10,
        // borderRadius:10,
    }

});