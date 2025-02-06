import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, List, Card, Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUserData } from "../store/userSlice";
import { fetchDrafts } from "../store/draftsSlice";
import { clearAllDrafts } from "../store/draftsSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchDrafts() as any);
  }, [dispatch]);

  const filteredDrafts = drafts.filter((draft) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      draft.subject.toLowerCase().includes(searchLower) ||
      draft.recipient.toLowerCase().includes(searchLower)
    );
  });

  const renderItem = ({ item }: { item: Draft }) => (
    <TouchableOpacity
      onPress={() => {
        if (!item.sent) {
          navigation.navigate("EmailEditor", { draft: item });
        }
      }}
    >
      <Card
        style={{
          marginVertical: 6,
          marginHorizontal: 12,
          elevation: 3,
          borderRadius: 8,
          backgroundColor: 'white'
        }}
        mode="elevated"
      >
        <Card.Content style={{ paddingVertical: 8, paddingHorizontal: 2 }}>
          <List.Item
            title={item.subject}
            description={`To: ${item.recipient}`}
            titleStyle={{ fontSize: 16, fontWeight: "bold" }}
            descriptionStyle={{ fontSize: 14, color: "gray" }}
            right={() => (
              <Text
                style={{
                  color: item.sent ? "green" : "red",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {item.sent ? "Sent" : "Draft"}
              </Text>
            )}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
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

  // const handleClearDrafts = () => {
  //   dispatch(clearAllDrafts() as any);
  // };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Searchbar
        placeholder="Search drafts..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredDrafts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? "No matching drafts found" : "No drafts available"}
          </Text>
        }
      />
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("EmailEditor")}
        buttonColor="#C2E7FF"
        textColor="black"
        style={styles.buttonMargin}
      >
        Create New Draft
      </Button>
      <Button
        mode="outlined"
        onPress={handleLogout}
        buttonColor="#FFE55F"
        textColor="black"
        style={styles.buttonMargin}
      >
        Logout
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonMargin: {
    marginTop: 10,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    margin:10,
    backgroundColor: 'white'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});