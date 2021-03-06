import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    FlatList
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";
import {user} from './../data/user'
import useForceUpdate from 'use-force-update';
import { firebase } from './../firebase';
import { auth } from './../firebase';
import { diff } from "react-native-reanimated";

const BookDetail = ({ route, navigation }) => {
    const [book, setBook] = React.useState(null);
    const [userInfor, setUserInfor] = useState(null)
    const [userList, setUserList] = useState(null)
    const [listBook, setListBook] = useState([])

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { book } = route.params;
        setBook(book)
    }, [])

    React.useEffect(() => {
        let userItem = {
            listBook: null
        };
        let userList;
        
        const userColumn = firebase.database().ref('user');
        userColumn.on('value', (snapshot)=>{
            userItem = snapshot.val();
            userList = [];
            for(let id in userItem){
                if(userItem[id].user == auth.currentUser?.email){
                    userList = {id, ...userItem[id]};
                    userItem = {...userItem[id]};
                    setUserInfor(userItem)
                    setUserList(userList)
                    break;
                }
                // userList.push({id, ...userItem[id]});
            }
            // console.log(userList);
        })
    }, [])

    const renderBookInfoSection = () => {
        return (
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
                <ImageBackground source={{ uri: book.bookCover}}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: book.backgroundColor
                    }}
                >
                </View>

                {/* Navigation header */}
                <View style={{ flexDirection: 'row', height: 40, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: book.navTintColor
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: book.navTintColor }}>Book Detail</Text>
                    </View>

                    <TouchableOpacity
                        style={{ marginRigth: SIZES.base }}
                    >
                        <Image
                            source={icons.more_icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: book.navTintColor,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Book Cover */}
                <View style={{ flex: 3, paddingTop: 10, alignItems: 'center' }}>
                    <Image
                        source={{uri: book.bookCover}}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 100,
                            height: "auto"
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: book.navTintColor }}>{book.bookName}</Text>
                    <Text style={{ ...FONTS.body3, color: book.navTintColor }}>{book.author}</Text>
                </View>
            </View>
        )
    }

    const renderBookDescription = () => {

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight
        // console.log(indicatorSize);

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1
        // console.log(difference)

        return (
            <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
                {/* Custom Scrollbar */}
                <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
                    <Animated.View
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: COLORS.lightGray4,
                            transform: [{
                                translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                {/* Description */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', padding: SIZES.base, marginBottom: 10, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Th??ng Tin Truy???n</Text>
                    </View>
                    <Text style={{ fontSize: 20, color: COLORS.white, marginBottom: 10}}>??i???m: {book.rating}</Text>
                    <Text style={{ fontSize: 20, color: COLORS.white, marginBottom: 10}}>Ng??n Ng???: Ti???ng Vi???t</Text>
                    <Text style={{ fontSize: 20, color: COLORS.white, marginBottom: 10}}>S??? Trang: {book.pageNo} trang</Text>
                    <Text style={{ fontSize: 20, color: COLORS.white, marginBottom: 10}}>Th??? Lo???i: {book.genre}</Text>
                    <Text style={{ fontSize: 20, color: COLORS.white, marginBottom: 10}}>L?????t Xem: {book.view}</Text>
                    <Text style={{ fontSize: 20, color: COLORS.white, marginBottom: 10}}>Ng??y Ph??t H??nh: {book.date}</Text>
                    <ScrollView style={{ ...FONTS.body2, color: "#FFFFFF" }}>
                    <Text style={{  ...FONTS.h2, color: COLORS.white, marginBottom: 10}}>T??m t???t: </Text>
                         {renderDescription(book.description)}
                    </ScrollView>
                </ScrollView>
            </View>
        )
    }

    const renderDescription = (description) => {
        // console.log(description)
        return (
            description.map((data, index) => {
                return (
                  <View key={index}><Text style={{color:"#FFFFFF",  fontSize:20}}>{data}</Text></View>
                )
              })
      )
    };

    const addBookToUser = (book) => {
        // console.log(book)
        // user.push(book)
        const userColumn = firebase.database().ref('user').child(userList.id);
        const listId = [...userInfor.listBook]

        if(listId.indexOf(book.id) != -1){
            listId.splice(listId.indexOf(book.id), 1)
            alert("Remove Successfully")
        }else{
            listId.push(book.id)
            alert("Add Successfully")
        }

        // const listId = [...listId, book.id]
        setListBook(listId)
        userColumn.update({
            ...userInfor,
            listBook: listId,
        })
        // forceUpdate();
        // console.log(user)
    }

    const  renderBottomButton = (book) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Bookmark */}
               {
                   userInfor['listBook'].indexOf(book.id) != -1 ?  <TouchableOpacity
                   style={{
                       width: 60,
                       backgroundColor: '#FFCC33',
                       marginLeft: SIZES.padding,
                       marginVertical: SIZES.base,
                       borderRadius: SIZES.radius,
                       alignItems: 'center',
                       justifyContent: 'center',
                   }}
                   onPress={() => addBookToUser(book)}
               >
                   <Image
                       source={icons.bookmark_icon}
                       resizeMode="contain"
                       style={{
                           width: 25,
                           height: 25,
                           tintColor: '#FFFFFF',
                       }}
                   />
               </TouchableOpacity>:
               <TouchableOpacity
               style={{
                   width: 60,
                   backgroundColor: COLORS.secondary,
                   marginLeft: SIZES.padding,
                   marginVertical: SIZES.base,
                   borderRadius: SIZES.radius,
                   alignItems: 'center',
                   justifyContent: 'center',
               }}
               onPress={() => addBookToUser(book)}
           >
               <Image
                   source={icons.bookmark_icon}
                   resizeMode="contain"
                   style={{
                       width: 25,
                       height: 25,
                       fontWeight: 'bold',
                       tintColor: '#FFFFFF'
                   }}
               />
           </TouchableOpacity>
               }

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("ShowChapter", {
                        book: book
                    })}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Start Reading</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (book && userInfor) {
        // console.log(userInfor)
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* Book Cover Section */}
                <View style={{ flex: 1.5 }}>
                {renderBookInfoSection()}
                </View>

                {/* Description */}
                <View style={{ flex: 2 }}>
                {renderBookDescription()}
                </View>

                {/* Buttons */}
                <View style={{ height: 70, marginBottom: 30 }}>
                {/* { userItem.listBook && renderBottomButton(book)} */}
                { renderBottomButton(book)}
                </View>
            </View>
        )
    } else {
        return (<></>)
    }

}

export default BookDetail;