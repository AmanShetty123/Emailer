import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUserData } from "../store/userSlice";
import { fetchDrafts } from "../store/draftsSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDrafts() as any);
  }, [dispatch]);

  const renderItem = ({ item }: { item: Draft }) => (
    <List.Item
      title={item.subject}
      description={`To: ${item.recipient}`}
      right={(props) => (
        <Text style={{ color: item.sent ? "green" : "red" }}>
          {item.sent ? "Sent" : "Draft"}
        </Text>
      )}
    />
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      dispatch(clearUserData());
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout failed!", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={drafts} // Changed from localDrafts to drafts
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No drafts available</Text>}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EmailEditor")}
        buttonColor="#C2E7FF"
        textColor="black"
      >
        Create New Draft
      </Button>
      <Button
        mode="contained"
        onPress={handleLogout}
        buttonColor="red"
        textColor="white"
      >
        Logout
      </Button>
    </View>
  );
};

export default HomeScreen;