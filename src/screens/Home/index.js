// import React, { useContext, useEffect, useState } from 'react';
// import { View, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
// import { Card, Button } from '@rneui/themed';
// import { collection, addDoc } from 'firebase/firestore/lite';
// import { WishContext } from '../Provider';
// import { db } from '../config';

// const HomeScreen = ({ navigation }) => {
//     const { wishlist, setWishlist } = useContext(WishContext);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = () => {
//             fetch('https://www.omdbapi.com/?s=kimetsu&apikey=655766c4')
//                 .then((response) => response.json())
//                 .then((json) => {
//                     setData(json.Search || []);
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                     setLoading(false);
//                 });
//         };

//         fetchData();

//         const hapus = navigation.addListener('focus', fetchData);

//         return hapus;
//     }, [navigation]);

//     const handleAddToWishlist = async (item) => {
//         try {
//             if (isInWishlist(item)) {
//                 console.warn('Item is already in the wishlist');
//                 return;
//             }

//             await saveToFirebase(item);
//             setWishlist((prevWishlist) => [...prevWishlist, item]);
//         } catch (error) {
//             console.warn('Error save: ', error);
//         }
//     };

//     const saveToFirebase = async (item) => {
//         const fireStoreCollection = collection(db, 'tugas');
//         const objectPost = {
//             title: item.Title,
//             year: item.Year,
//             poster: item.Poster,
//         };
//         try {
//             await addDoc(fireStoreCollection, objectPost);
//             console.warn('Movie berhasil masuk wishlist');
//         } catch (error) {
//             console.warn('Error memasuki wishlist: ', error);
//             throw error;
//         }
//     };

//     const isInWishlist = (item) => {
//         return wishlist.some((wishlistItem) => wishlistItem.title === item.Title);
//     };

//     if (loading) {
//         return (
//             <View style={styles.loader}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     const filteredData = data.filter((item) => !isInWishlist(item));

//     return (
//         <FlatList
//             data={filteredData}
//             keyExtractor={(item) => item.imdbID}
//             renderItem={({ item }) => (
//                 <Card>
//                     <Card.Title>{item.Title}</Card.Title>
//                     <View style={styles.item}>
//                         {item.Poster && <Image source={{ uri: item.Poster }} style={styles.poster} />}
//                     </View>
//                     <Card.Title>{item.Year}</Card.Title>
//                     <Button
//                         buttonStyle={[
//                             styles.button,
//                             isInWishlist(item) && styles.buttonWishlist,
//                         ]}
//                         title="Wishlist"
//                         onPress={() => handleAddToWishlist(item)}
//                         disabled={isInWishlist(item)}
//                     />
//                 </Card>
//             )}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 10,
//     },
//     item: {
//         marginBottom: 20,
//     },
//     poster: {
//         width: '100%',
//         height: 200,
//         marginBottom: 10,
//     },
//     button: {
//         borderRadius: 0,
//         marginHorizontal: 0,
//         marginBottom: 0,
//     },
//     buttonWishlist: {
//         backgroundColor: 'red',
//     },
//     loader: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default HomeScreen;

import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { collection, addDoc } from 'firebase/firestore/lite';
import { db } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../redux/action';

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const wishlist = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = () => {
            fetch('https://www.omdbapi.com/?s=kimetsu&apikey=655766c4')
                .then((response) => response.json())
                .then((json) => {
                    setData(json.Search || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        };

        fetchData();

        const hapus = navigation.addListener('focus', fetchData);

        return hapus;
    }, [navigation]);

    const handleAddToWishlist = async (item) => {
        if (isInWishlist(item)) {
            console.warn('Item is already in the wishlist');
            return;
        }
        try {
            await saveToFirebase(item); // Save to Firebase first
            dispatch(addToWishlist(item)); // Then dispatch action to add to Redux
        } catch (error) {
            console.warn('Error adding to wishlist: ', error);
        }
    };
    
    

    const isInWishlist = (item) => {
        return wishlist.some((wishlistItem) => wishlistItem.title === item.Title);
    };

    const saveToFirebase = async (item) => {
        const fireStoreCollection = collection(db, 'tugas');
        const objectPost = {
            title: item.Title,
            year: item.Year,
            poster: item.Poster,
        };
        try {
            await addDoc(fireStoreCollection, objectPost);
            console.warn('Movie berhasil masuk wishlist');
        } catch (error) {
            console.warn('Error memasuki wishlist: ', error);
            throw error;
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const filteredData = data.filter((item) => !isInWishlist(item));

    return (
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
                <Card>
                    <Card.Title>{item.Title}</Card.Title>
                    <View style={styles.item}>
                        {item.Poster && <Image source={{ uri: item.Poster }} style={styles.poster} />}
                    </View>
                    <Card.Title>{item.Year}</Card.Title>
                    <Button
                        buttonStyle={[
                            styles.button,
                            isInWishlist(item) && styles.buttonWishlist,
                        ]}
                        title="Wishlist"
                        onPress={() => handleAddToWishlist(item)}
                        disabled={isInWishlist(item)}
                    />
                </Card>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    item: {
        marginBottom: 20,
    },
    poster: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    button: {
        borderRadius: 0,
        marginHorizontal: 0,
        marginBottom: 0,
    },
    buttonWishlist: {
        backgroundColor: 'red',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;