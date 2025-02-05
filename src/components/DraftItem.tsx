import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { Draft } from "../store/draftsSlice";

interface DraftItemProps {
  draft: Draft;
  onPress: () => void;
}

const DraftItem: React.FC<DraftItemProps> = ({ draft, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ marginVertical: 8, padding: 10 }}>
        <Card.Content>
          <Text variant="titleMedium">{draft.subject || "No Subject"}</Text>
          <Text variant="bodyMedium" numberOfLines={1}>
            {draft.body || "No content"}
          </Text>
          {draft.sent && <Text style={{ color: "green" }}>Sent</Text>}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default DraftItem;
