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
import { array_genre } from './../data/genre';

const Genre = ({navigation}) => {

    const renderGenre = (genre) => {
        console.log(genre)
        return (
            genre.map((data, index) => {
                return (
                    <TouchableOpacity 
                        key={index}
                        style={{ backgroundColor: "#FF6600", margin: 7, padding: 15, borderRadius: 15, cursor: 'pointer'}} 
                        onPress={() => navigation.navigate("FilterBook", data)}  
                    >
                        <Text style={{cursor: 'pointer', fontSize: 20, color: COLORS.white}}>Truyện: {data}</Text>
                    </TouchableOpacity>
                )
            })
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black, padding: 15}}>
            <Text style={{ ...FONTS.h2, color: COLORS.white, textTransform: "capitalize", padding: 10 }}>Thể Loại Truyện</Text>
            <ScrollView style={{cursor: 'pointer', marginTop: 10}}>
                {renderGenre(array_genre)}
            </ScrollView>
        </View>
    )

}

export default Genre;