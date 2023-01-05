
// external imports: 
import { TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";

// internal exports: 
import {styles} from "./Styles.js";

const AudioControls = (props) => {
    return(
        <View style={styles.buttonRow}>
        <View style={{flex: 1}}/>
        <TouchableOpacity style={{flex: 2}} onPress={() => {props.setShuffle(toggled => !toggled)}}>
          <FeatherIcon name="shuffle" color={props.shuffle ? '#579f6e' : 'white'} size={30}></FeatherIcon>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 2}} onPress={() => props.navPrevSong()}>
          <AntIcon  name="stepbackward" color="white" size={20}></AntIcon>
        </TouchableOpacity>
        {props.playing ? (
            <TouchableOpacity style={{flex: 3}} onPress={() => props.setPlaying(false)}>
            <FeatherIcon  name="pause-circle" color="white" size={60}></FeatherIcon>
            </TouchableOpacity>
        ):
        (
            <TouchableOpacity style={{flex: 3}} onPress={() => props.setPlaying(true)}>
            <FeatherIcon  name="play-circle" color="white" size={60}></FeatherIcon>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{flex: 2}} onPress={() => {props.navNextSong()}}>
          <AntIcon  name="stepforward" color="white" size={20}></AntIcon>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => {props.setLoopMode(toggled => !toggled)}}>
          <EntypoIcon name="cycle" color={props.loopMode ? '#579f6e' : 'white'} size={20}></EntypoIcon>
        </TouchableOpacity>
        <View style={{flex: 1}}/>
      </View>
    )
}


export default AudioControls;