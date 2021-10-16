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
import { content } from '../data/content';

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const ShowChapter = ({ route, navigation }) => {

    const [book, setBook] = React.useState(null);

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { book } = route.params;
        setBook(book)
    }, [book])

    const renderContent = (content) => {
        // console.log(content)
        return (
            <TouchableOpacity 
                style={{ backgroundColor: "#FF6600", margin: 5, padding: 5, borderRadius: 5, color: "#EEEEEE"}} 
                onPress={() => navigation.navigate("ShowContent", {
                    content: content.item.content
                })}  
            ><Text>{content.item.Chapter}</Text></TouchableOpacity>
      )
    };

    if (book) {
        return (
            <View style={{ backgroundColor: COLORS.black }}>
                 
                  {/* <Text style={{ ...FONTS.body2, color: COLORS.lightGray, padding: 10 }}>
                    <FlatList
                            data={content}
                            renderItem={renderContent}
                            style={{width:"100%"}}
                            numColumns={1}
                        />
                    </Text> */}
            </View>
        )
    } else {
        return (<></>)
    }

}

export default ShowChapter;