import React from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    FlatList,
    StyleSheet
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";
import {user} from './../data/user'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useEffect, useState } from "react";
import useForceUpdate from 'use-force-update';
import { auth } from '../firebase'
import { firebase } from '../firebase';
// import { useNavigation } from '@react-navigation/core'
import { data } from './../data'

const User = ({navigation}) => {

    // const navigation = useNavigation()
    const [account, setAccount] = useState([]);
    const [ userList, setUserList] = useState();
    const forceUpdate = useForceUpdate();


    const removeFromUser = (book) => {
        console.log(userList)
        userList.listBook.splice(userList.listBook.indexOf(book.id), 1);
        const userColumn = firebase.database().ref('user').child(userList.id);
        userColumn.update({
            ...userList,
        })
        console.log(userList)
    } 

    useEffect(() => {
        let userItem;
        let userList;
        const userColumn = firebase.database().ref('user');
        userColumn.on('value', (snapshot)=>{
            userItem = snapshot.val();
            userList = [];
            for(let id in userItem){
                if(userItem[id].user == auth.currentUser?.email){
                    userList = {id, ...userItem[id]};
                    userItem = {...userItem[id]};
                    break;
                }
                // userList.push({id, ...userItem[id]});
            }
            console.log(userList);
            setUserList(userList)
            
            let listBook = [];
            for(let i=0; i<data.length; i++){
                if(userList.listBook.indexOf(data[i].id) >= 0){
                  listBook.push(data[i]);
                //   console.log(listBook)
                }
            }
            setAccount(listBook)
            // console.log(account)
        })
    }, [])
        
    function renderMyBookSection(myBooks) {

        const renderItem = ({ item, index }) => {
            return (
                    <TouchableOpacity
                        style={{
                            width: '50%',
                            height: 300,
                            padding:10,
                        }}
                        onPress={() => navigation.navigate("BookDetail", {
                            book: item
                        })}
                    >   
                        <TouchableOpacity
                            style={{ 
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                zIndex:1
                              }}
                            onPress={() => removeFromUser(item)}
                        >
                            <IconAntDesign name="delete" size={30} color="#fff" />
                        </TouchableOpacity>

                        {/* Book Cover */}
                        <Image
                            source={{uri: item.bookCover}}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: "80%",
                                borderRadius: 20
                            }}
                        />

                        {/* Book Info */}
                        <View style={{ marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={icons.clock_icon}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.lightGray
                                }}
                            />
                            <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>10d 5h</Text>

                            <Image
                                source={icons.page_icon}
                                style={{
                                    marginLeft: SIZES.radius,
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.lightGray
                                }}
                            />
                            <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.readed} %</Text>
                        </View>
                    </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sách Đã Đánh Dấu</Text>
                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding}}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        style={{width:"100%"}}
                        numColumns={2}
                    />
                </View>
            </View>
        )
    }

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.navigate("Login")
          })
          .catch(error => alert(error.message))
      }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black, padding:10 }}>
            <View style={{marginTop: 20, marginLeft: 10, flex: 1, justifyContent: "space-between", alignItems: 'center', flexDirection: 'row'}}>
                 <Image
                    source={{uri: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25634104.jpg"}}
                    resizeMode="cover"
                    style={{
                        height: 90,
                        borderRadius: 50, 
                        width:"26%"
                    }}
                />

                <View style={styles.rightUser}>
                    <Text style={{fontSize: 20, color: '#ffffff'}}>{auth.currentUser?.email}</Text>
                    <TouchableOpacity
                        onPress={handleSignOut}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 5, backgroundColor: COLORS.black }}>
                <ScrollView style={{ marginTop: SIZES.radius }}>
                    <View>
                        {renderMyBookSection(account)}
                    </View>
                </ScrollView>
            </View>
        </View>
    )

}

export default User;
const styles = StyleSheet.create({
    rightUser:{
        width: "65%",
    },
     button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  })
  