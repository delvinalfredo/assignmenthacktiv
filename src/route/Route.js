import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishlistHandle from '../screens/Wishlist/';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Router = () => {
    const HomeStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name={'Movie List'} component={Home} />
            </Stack.Navigator>
        );
    };

    const SettingStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name={'Wishlist'} component={WishlistHandle} />
            </Stack.Navigator>
        );
    };

    return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarStyle={{
                        height: 70,
                        paddingBottom: 10,
                        paddingTop: 5,
                    }}
                    tabBarLabelStyle={{
                        fontSize: 12,
                    }}
                    tabBarActiveTintColor="violet">
                    <Tab.Screen
                        name={'Home'}
                        component={HomeStack}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <AntIcon name="home" color={color} size={focused ? 24 : 20} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name={'Wishlist Item'}
                        component={SettingStack}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <AntIcon
                                    name="book"
                                    size={24}
                                    color="black"
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
    );
};

export default Router;

