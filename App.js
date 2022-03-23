import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import RootNavigator from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import { theme, Container } from "./styles";

export default function App() {
  return (
    <NativeBaseProvider>
      <Container>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <StatusBar style="auto" />
        </ThemeProvider>
      </Container>
    </NativeBaseProvider>
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
