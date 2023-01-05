
// external imports:
import * as Progress from "react-native-progress";
import {View, Dimensions, Text} from "react-native";
import {useState, useEffect} from "react";


// internal imports:
import {styles} from "./Styles.js"

const ProgressBar = (props) => {
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const [elapTime, setElapTime] = useState(-1);
    const [remainTime, setRemainTime] = useState(-1);

    const [elapTimeStr, setElapTimeStr] = useState("00:00");
    const [remainTimeStr, setRemainTimeStr] = useState("--:--");

    function secsToMinsAndSecs(time) {
        let songMins = Math.floor(time / 60); 
        let songSecs = time % 60;
        return [songMins, songSecs]    
    }

    function getTimeString(time) {
        let timeArr = secsToMinsAndSecs(time);
        if(timeArr[1] < 10) {
            return `${timeArr[0]}:0${timeArr[1]}`;
        }
        else {
            return `${timeArr[0]}:${timeArr[1]}`;
        }
    }

    
    /**
     * Update time string whenever associated vals change:
     */
    useEffect(() => {
        if(elapTime !== -1 && remainTime !== -1) {
            setElapTimeStr(getTimeString(elapTime));
            setRemainTimeStr(getTimeString(remainTime));
        }
    }, [elapTime, remainTime])

    /**
     * Update vars as soon as song is loaded in
     */
    useEffect(() => {
        setElapTime(0);
        setRemainTime(props.songLength);
    }, [props.songLength])

    /**
     * Nav to next song when current song finishes playing
     */
    useEffect(() => {
        if(props.songLength && elapTime === props.songLength) {
            props.navNextSong();
        }
    }, [props.songLength, elapTime])


    /**
     * If there is a song playing and a song length has been loaded in
     * increment progress bar and nav to next song if 
     */
    useEffect(() => {
        if(props.playing && props.songLength && elapTime <= props.songLength) {
            const intervalId = setInterval(() => {
                setElapTime(elapTime => elapTime + 1);
                setRemainTime(remainTime => remainTime - 1);
            }, 1000);
              return () => clearInterval(intervalId);
        }
      }, [props.playing, props.songLength]);

    return(
        <View style={styles.progressBarCont}>
            <View style={styles.timeRow}>
                <Text style={[styles.primaryAccent, {fontSize: 14}]}>{elapTimeStr}</Text>
                <Text style={[styles.primaryAccent, {fontSize: 14}]}>{remainTimeStr}</Text>
            </View> 
            <Progress.Bar borderColor={'#000000'} unfilledColor={'white'} color={'#579f6e'} progress={props.songLength ? elapTime / props.songLength : 0} width={0.8 * SCREEN_WIDTH}/>
        </View>
    )
}

export default ProgressBar;