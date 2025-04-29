import { StyleSheet, Text } from "react-native"

// export default function Title (props) {
export default Title = (props) => {
  return (
    <Text style={styles.title}>{props.text}</Text>
  )
}


const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'blue'
    }
  })