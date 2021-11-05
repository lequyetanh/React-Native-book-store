import React from "react";
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
    van_hoc
} from './../data';
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const FilterBook = ({route, navigation}) => {

    const [genre, setGenre] = React.useState(null);
    let allBook = [];
    let genreSelected = [];
    allBook.push( 
        gia_tuong,
        khoa_hoc,
        kiem_hiep,
        kinh_di,
        lang_man,
        lich_su,
        phieu_luu,
        triet_hoc,
        trinh_tham,
        van_hoc
    )

    // console.log(allBook)
    let params = route.params;
    for(let i=0; i<allBook.length; i++){
        // console.log(allBook[i][0].genre)
        if(allBook[i][0].genre == params){
            genreSelected = allBook[i];
            break;
        }
    }

    React.useEffect(() => {
        let genre = route.params;
        // console.log(genre)
        setGenre(genre);
        // console.log(genreSelected)

    }, )

    
    function renderMyBookSection(myBooks) {

        // console.log(myBooks)
        const renderItem = ({ item, index }) => {
            return (
                    <TouchableOpacity
                        style={{
                            width: '50%',
                            height: 300,
                            padding:5,
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

    if (genreSelected) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black,  padding: 20   }}>
                <TouchableOpacity
                    style={{ position: "relative", zIndex: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <IconAntDesign name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, textAlign: 'center', marginTop: -30}}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white, textTransform: "capitalize" }}>Thể Loại Truyện: {genre}</Text>
                </View>
                <ScrollView style={{ marginTop: SIZES.radius }}>
                    {/* Books Section */}
                    <View>
                        {renderMyBookSection(genreSelected)}
                    </View>
                </ScrollView>
            </View>
        )
    } else {
        return (<></>)
    }


}

export default FilterBook;