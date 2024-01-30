import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
export default function SignInScreen() {
  return (
    <View style={styles.root}>
      <LinearGradient colors={["#0354C7", "#0047AC", "#031836"]}>
        <Text style={styles.login2} testID="1:89">
          jhvjhv
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 366,
    height: 64,
    flexShrink: 0,
  },
  login2: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
  },
});
