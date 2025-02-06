import { PaperProvider } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#25D366' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500'
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FF0033' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500'
      }}
      text2Style={{
        fontSize: 13
      }}
    />
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
        <Toast config={toastConfig} />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});