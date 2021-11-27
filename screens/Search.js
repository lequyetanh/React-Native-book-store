
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet
} from 'react-native';
import React, { useEffect, useState } from 'react'
import {FONTS, COLORS, SIZES, icons} from "../constants";
import {array_genre} from './../data/genre';
import { data, trinh_tham } from './../data';
import IconAntDesign from 'react-native-vector-icons/AntDesign'

const Search = ({navigation}) => {


    const [search, setSearch] = useState()
    const [bookSearch, setBookSearch] = useState(trinh_tham)
    // // console.log(data)

    // setBookSearch(trinh_tham);

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
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
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

    let item = [];
    const searchBook = () => {
        item = [];
        for(let i=0; i<data.length ; i++){
            let localSearch = removeAccents(search).toLowerCase();
            let localName = removeAccents(data[i].bookName).toLowerCase();
            if(localName.search(localSearch) == -1){
                continue;
            }
            else{
                item.push(data[i])
            }
        }
        // console.log(item);
        setBookSearch(item);
    }

    const removeAccents = (str)  => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    useEffect(() => {

    }, [])

    return (
        <View
          style={{
          flex: 1,
          backgroundColor: COLORS.black,
          padding: 15
        }}>
          <KeyboardAvoidingView style={styles.flexbox} behavior="padding">
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Write Name Your Book"
                value={search}
                onChangeText={text => setSearch(text)}
                style={styles.input}/>
            </View>
    
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={()=>{searchBook()}}>
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Books Section */}
                <View>
                    {renderMyBookSection(bookSearch)}
                </View>
            </ScrollView>
        </View>
      )

}

export default Search;

const styles = StyleSheet.create({
    flexbox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    inputContainer: {
      width: '69%',
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 25,
      paddingVertical: 15,
      borderRadius: 10,
    },
    buttonContainer: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })
  