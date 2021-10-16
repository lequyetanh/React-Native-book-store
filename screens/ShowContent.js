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
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const ShowContent = ({ route, navigation }) => {

    const [book, setBook] = React.useState(null);
    let data  = content[0].content;
    // console.log(data)

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

    if (!book) {
        return (
            <View style={{backgroundColor: COLORS.black,  padding: 20  }}>

                <TouchableOpacity
                    style={{ }}
                    onPress={() => navigation.goBack()}
                >
                    <IconAntDesign name="arrowleft" size={30} color="#fff" />
                </TouchableOpacity>
                <ScrollView style={{ ...FONTS.body2, color: "#EEEEEE",}}>
                    {
                        renderContent(data)
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