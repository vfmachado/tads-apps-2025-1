import { Image, Text, TouchableOpacity, View } from "react-native"
import { mainStyle } from "../utils/CSS"

export default CategoryCard = ({name, highlight, icon, ...rest}) => {

  const hightLightBorder = highlight ? {borderWidth: 2, borderColor: 'gray'} : {};

  return (
    <TouchableOpacity {...rest}>
      <View style={{ ...mainStyle.card, ...hightLightBorder}}>
        <Text style={mainStyle.center}>{name}</Text>
        <Image source={icon} style={mainStyle.icon} />
      </View>
    </TouchableOpacity>
  )
}