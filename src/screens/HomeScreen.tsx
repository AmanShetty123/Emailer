import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loadDrafts } from "../storage/draftsStorage";
import { Draft } from "../store/draftsSlice";
import DraftItem from "../components/DraftItem";

const HomeScreen = () => {
  const navigation = useNavigation();
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const [localDrafts, setLocalDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      const storedDrafts: Draft[] = await loadDrafts();
      setLocalDrafts(storedDrafts);
    };
    fetchDrafts();
  }, [drafts]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={localDrafts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <DraftItem draft={item} onPress={() => navigation.navigate('EmailEditor', { draft: item })} />
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EmailEditor")}
        buttonColor="#C2E7FF"
        textColor="black"
      >
        Create New Draft
      </Button>
    </View>
  );
};

export default HomeScreen;
