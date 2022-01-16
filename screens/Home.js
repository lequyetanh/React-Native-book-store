import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';
// import * as data_book from './../data/index';
import { auth } from '../firebase'
import {
    gia_tuong,
    khoa_hoc,
    kiem_hiep,
    kinh_di,
    lang_man,
    lich_su,
    phieu_luu,
    triet_hoc,
    trinh_tham,
    van_hoc,
} from './../data';
// import StandardBook from "./StandardBook";

const Home = ({route, navigation }) => {
   
    function renderHeader() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 25,marginRight: 25, alignItems: 'center', marginTop: 20, justifyContent: 'space-between' }}>
                {/* Greetings */}
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Welcome</Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.white, marginLeft: -5 }}> {auth.currentUser?.email}</Text>
                    </View>
                    <Image
                        // source={{uri: icons.appIcon}}
                        source = {{uri: "https://image.flaticon.com/icons/png/512/1457/1457793.png"}}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    />
            </View>
        )
    }

    function renderMyBookSection(myBooks) {

        let localMyBooks = [];
        for(let i=0; i< 4; i++){
            localMyBooks.push(myBooks[i]);
        }

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
                                source={icons.bookmark_icon}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.lightGray
                                }}
                            />
                            <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.rating}</Text>

                            <Image
                                source={icons.page_icon}
                                style={{
                                    marginLeft: SIZES.radius,
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.lightGray
                                }}
                            />
                            <Text style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}>{item.pageNo}</Text>
                        </View>
                    </TouchableOpacity>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white, textTransform: "capitalize" }}>{myBooks[0].genre}</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("FilterBook", myBooks[0].genre)}  
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start', textDecorationLine: 'underline' }}>see more</Text>
                    </TouchableOpacity>
                </View>

                {/* Books */}
                <View style={{ flex: 1, marginTop: SIZES.padding}}>
                    <FlatList
                        data={localMyBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        style={{width:"100%"}}
                        numColumns={2}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header Section */}
            <View style={{ height: 80}}>
                {renderHeader()}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Books Section */}
                <View>
                    {renderMyBookSection(kinh_di)}
                    {renderMyBookSection(trinh_tham)}
                    {renderMyBookSection(gia_tuong)}
                    {renderMyBookSection(khoa_hoc)}
                    {renderMyBookSection(kiem_hiep)}
                    {renderMyBookSection(lang_man)}
                    {renderMyBookSection(lich_su)}
                    {renderMyBookSection(phieu_luu)}
                    {renderMyBookSection(triet_hoc)}
                    {renderMyBookSection(van_hoc)}
                </View>

                {/* Categories Section */}
                {/* <StandardBook></StandardBook> */}
            </ScrollView>
        </View>
    )
}

export default Home;