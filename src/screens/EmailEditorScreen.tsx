import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addDrafts, updateDrafts, sendDraft, sentEmail } from "../store/draftsSlice";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import uuid from 'react-native-uuid';

const EmailEditorScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<{ params: { draft?: any } }, "params">>();
  const draft = route.params?.draft;

  const [recipient, setRecipient] = useState(draft?.recipient || "");
  const [subject, setSubject] = useState(draft?.subject || "");
  const [body, setBody] = useState(draft?.body || "");

  const isEditing = draft != null;
  const draftId = draft?.id
  const handleSendEmail = async () => {
    const draftData = {
      id: draftId || uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: true
    };
   
    if (draftId) {
      // Update existing draft to sent status
      dispatch(sendDraft(recipient, subject, body, draftId) as any);
    } else {
      // Add new sent draft
      dispatch(sentEmail(recipient, subject, body, draftId) as any);
    }
    navigation.navigate("Home");
  };
  
  const handleSaveAsDraft = () => {
    const draftData = {
      id: draftId || uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: false
    };
   
    if (draftId) {
      // Update existing draft
      dispatch(updateDrafts(draftId, recipient, subject, body) as any);
    } else {
      // Add new draft
      dispatch(addDrafts(recipient, subject, body) as any);
    }
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="Recipient"
        value={recipient}
        onChangeText={setRecipient}
        style={{ marginBottom: 10, backgroundColor: "white", borderRadius: 10 }}
        placeholderTextColor={"#C2E7FF"}
      />
      <TextInput
        label="Subject"
        value={subject}
        onChangeText={setSubject}
        style={{ marginBottom: 10, backgroundColor: "white", borderRadius: 10 }}
        placeholderTextColor={"#C2E7FF"}
      />
      <TextInput
        label="Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={5}
        style={{
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 10
        }}
      />
      <Button
        mode="contained"
        onPress={handleSendEmail}
        buttonColor="#25D366"
        textColor="white"
      >
        Send Email
      </Button>
      <Button
        mode="contained"
        onPress={handleSaveAsDraft}
        buttonColor="#FF0033"
        textColor="white"
        style={{
          marginTop: 10
        }}
      >
        Save Draft
      </Button>
    </View>
  );
};

export default EmailEditorScreen;
