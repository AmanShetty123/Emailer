import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addDrafts, updateDrafts, sendDraft, sentEmail } from "../store/draftsSlice";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import uuid from 'react-native-uuid';

interface FormErrors {
  recipient: string;
  subject: string;
  body: string;
}

const EmailEditorScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<{ params: { draft?: any } }, "params">>();
  const draft = route.params?.draft;
  
  const [recipient, setRecipient] = useState(draft?.recipient || "");
  const [subject, setSubject] = useState(draft?.subject || "");
  const [body, setBody] = useState(draft?.body || "");
  const [errors, setErrors] = useState<FormErrors>({
    recipient: "",
    subject: "",
    body: ""
  });
  
  const isEditing = draft != null;
  const draftId = draft?.id;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (isDraft: boolean = false) => {
    const newErrors: FormErrors = {
      recipient: "",
      subject: "",
      body: ""
    };

    // Recipient validation
    if (!recipient) {
      newErrors.recipient = "Email address is required";
    } else if (!validateEmail(recipient)) {
      newErrors.recipient = "Please enter a valid email address";
    }

    // Only validate subject and body if not saving as draft
    if (!isDraft) {
      // Subject validation
      if (!subject.trim()) {
        newErrors.subject = "Subject is required";
      }

      // Body validation
      if (!body.trim()) {
        newErrors.body = "Message body is required";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleRecipientChange = (text: string) => {
    setRecipient(text);
    if (text && !validateEmail(text)) {
      setErrors(prev => ({ ...prev, recipient: "Please enter a valid email address" }));
    } else {
      setErrors(prev => ({ ...prev, recipient: "" }));
    }
  };

  const handleSubjectChange = (text: string) => {
    setSubject(text);
    if (errors.subject) {
      setErrors(prev => ({ ...prev, subject: "" }));
    }
  };

  const handleBodyChange = (text: string) => {
    setBody(text);
    if (errors.body) {
      setErrors(prev => ({ ...prev, body: "" }));
    }
  };

  const handleSendEmail = async () => {
    if (!validateForm()) {
      return;
    }

    const draftData = {
      id: draftId || uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: true
    };
   
    if (draftId) {
      dispatch(sendDraft(recipient, subject, body, draftId) as any);
    } else {
      dispatch(sentEmail(recipient, subject, body, draftId) as any);
    }
    navigation.navigate("Home");
  };
 
  const handleSaveAsDraft = () => {
    if (!validateForm(true)) {
      return;
    }

    const draftData = {
      id: draftId || uuid.v4().toString(),
      recipient,
      subject,
      body,
      sent: false
    };
   
    if (draftId) {
      dispatch(updateDrafts(draftId, recipient, subject, body) as any);
    } else {
      dispatch(addDrafts(recipient, subject, body) as any);
    }
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: errors.recipient ? 0 : 10 }}>
        <TextInput
          label="Recipient *"
          value={recipient}
          onChangeText={handleRecipientChange}
          style={{ backgroundColor: "white", borderRadius: 10 }}
          placeholderTextColor={"#C2E7FF"}
          error={!!errors.recipient}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <HelperText type="error" visible={!!errors.recipient}>
          {errors.recipient}
        </HelperText>
      </View>

      <View style={{ marginBottom: errors.subject ? 0 : 10 }}>
        <TextInput
          label="Subject *"
          value={subject}
          onChangeText={handleSubjectChange}
          style={{ backgroundColor: "white", borderRadius: 10 }}
          placeholderTextColor={"#C2E7FF"}
          error={!!errors.subject}
        />
        <HelperText type="error" visible={!!errors.subject}>
          {errors.subject}
        </HelperText>
      </View>

      <View style={{ marginBottom: errors.body ? 0 : 10 }}>
        <TextInput
          label="Body *"
          value={body}
          onChangeText={handleBodyChange}
          multiline
          numberOfLines={5}
          style={{
            backgroundColor: "white",
            borderRadius: 10
          }}
          error={!!errors.body}
        />
        <HelperText type="error" visible={!!errors.body}>
          {errors.body}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={handleSendEmail}
        buttonColor="#25D366"
        textColor="white"
        disabled={Object.values(errors).some(error => error !== "")}
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