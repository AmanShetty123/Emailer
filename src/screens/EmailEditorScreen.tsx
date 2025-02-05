import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addDraft, updateDraft, markAsSent } from "../store/draftsSlice";
import { saveDrafts } from "../storage/draftsStorage";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { sendEmail } from "../services/emailService";
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
    if (!recipient.trim() || !subject.trim() || !body.trim()) {
      alert('Please fill all fields before sending.');
      return;
    }
  
    try {
      await sendEmail(recipient, subject, body);
      if (isEditing && draftId) {
        dispatch(markAsSent(draftId));
      } else {
        const newDraft = {
          id: new Date().toISOString(), // generate a new ID
          recipient,
          subject,
          body,
          sent: true,
        };
        dispatch(addDraft(newDraft));
      }
      alert('Email sent successfully!');
      navigation.goBack();
    } catch (error) {
      alert('Failed to send email. Please try again.');
    }
  };
  
  const handleSaveAsDraft = () => {
    const newDraft = {
      id: uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: false
    };

    dispatch(addDraft(newDraft));
    navigation.goBack(); // Optional: return to previous screen
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
