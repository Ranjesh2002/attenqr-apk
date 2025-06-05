import { StyleSheet, Text, View } from "react-native";

export const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export const CardHeader = ({ children }) => {
  return <View style={styles.header}>{children}</View>;
};

export const CardTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export const CardDescription = ({ children }) => {
  return <Text style={styles.description}>{children}</Text>;
};

export const CardContent = ({ children }) => {
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  content: {
    marginTop: 8,
  },
});
