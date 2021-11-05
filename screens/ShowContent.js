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

const ShowContent = ({ route, navigation }) => {

    const [book, setBook] = React.useState(null);
    const [genre, setGenre] = React.useState(null);
    const [content, setContent] = React.useState(false)
    // let data  = content[0].content;
    // console.log(data)

    React.useEffect(() => {
        let  genre = route.params.genre;
        let book  = route.params.book;
        setBook(book)
        setGenre(genre)
        // console.log(book)

        // console.log(book)
        // console.log(genre)

        for(let i=0;i<book.content.length; i++){
            if(book.content[i].chapter == genre){
                setContent(book.content[i].content)
                // console.log(content)
            }
        }
    }, [book, genre])

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    const renderContent = (content) => {
        // console.log(content)
        return (
            content.map((data, index) => {
                // console.log(data)
                return (
                  <View key={index}><Text style={{color:"#EEEEEE",  fontSize:20}}>{data}</Text></View>
                )
              })
      )
    };

    if (content) {
        return (
            <View style={{backgroundColor: COLORS.black,  padding: 20  }}>

                <TouchableOpacity
                    style={{ position: "relative", zIndex: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <IconAntDesign name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: SIZES.padding, textAlign: 'center', marginTop: -30, marginBottom: 20}}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white, textTransform: "capitalize" }}>Nội Dung Truyện</Text>
                </View>
                <ScrollView style={{ ...FONTS.body2, color: "#EEEEEE",}}>
                    {
                        renderContent(content)
                    }
                        {/* <Text>{}</Text> */}
                </ScrollView>
            </View>
        )
    } else {
        return (<></>)
    }

}

export default ShowContent;