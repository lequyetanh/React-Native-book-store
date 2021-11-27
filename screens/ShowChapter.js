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
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const ShowChapter = ({ route, navigation }) => {

    const [book, setBook] = React.useState(null);

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { book } = route.params;
        setBook(book)
        // console.log(book)
    }, [book])

    const renderContent = (chapter) => {
        // console.log(chapter)
        return (
            chapter.map((data, index) => {

                return (
                    <TouchableOpacity 
                        key={index}
                        style={{ backgroundColor: "#FF6600", margin: 7, padding: 15, borderRadius: 15, cursor: 'pointer', width:'95%'}} 
                        onPress={() => navigation.navigate("ShowContent", {genre: data, book: book})}  
                    >
                        <Text style={{cursor: 'pointer', fontSize: 14, color: COLORS.white}}>{data}</Text>
                    </TouchableOpacity>
                )
            })
        )
    };

    if (book) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black, padding: 15}}>
                 
                 <TouchableOpacity
                   style={{ position: "relative", zIndex: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <IconAntDesign name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: SIZES.padding, textAlign: 'center', marginTop: -30}}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white, textTransform: "capitalize" }}>Danh Sách Chapter</Text>
                </View>
                    <ScrollView style={{ fontSize: 13, color: "#EEEEEE",cursor: 'pointer', marginTop: 10}}>
                        {
                            renderContent(book.chapter)
                        }
                            {/* <Text>{}</Text> */}
                    </ScrollView>
            </View>
        )
    } else {
        return (<></>)
    }

}

export default ShowChapter;