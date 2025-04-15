import { StyleSheet, Text, View } from "react-native"
import Title from "../components/Title"
import { mainStyle } from "../utils/CSS"
import CategoryCard from "../components/CategoryCard"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Button } from "react-native"
import { ActivityIndicator } from "react-native"
import { AuthContext } from "../contexts/auth-context"


export default Dashboard = ({ navigation }) => {

  const { user } = useContext(AuthContext);
  
  return (
    <View>
      <Text>Dashboard - {user.email}</Text>
      {/* <Button title="PROFILE" onPress={() => navigation.navigate('profile')} /> */}
    </View>
  );
};
