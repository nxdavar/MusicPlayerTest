// external exports: 
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image, 
} from 'react-native';
import {useState} from "react";

// internal exports: 
import {styles} from "./Styles.js";
import AudioControls from './AudioControls.js';
import ProgressBar from './ProgressBar.js';
import sampleData from "../data/sampleData.json";

const App = () => {

  const [playing, setPlaying] = useState(false);
  const [currSong, setCurrSong] = useState(sampleData[0]);
  const [currIndex, setCurrIndex] = useState(0);
  // added to as more songs are queued
  const [prevIndices, setPrevIndices] = useState([]);
  const [prevIndexSet, setPrevIndexSet] = useState(new Set());

  const [shuffle, setShuffle] = useState(false);
  const [loopMode, setLoopMode] = useState(false);



  /**
   * Designed app such that user cannot activate 
   * both shuffle and loop mode, disable other 
   * if user tries to select both
   */
  function setShuffleHelper(newVal) {
    if(newVal && loopMode) {
      setLoopMode(false);
    }
    setShuffle(newVal);
  }


  function setLoopModeHelper(newVal) {
    if(newVal && shuffle) {
      setShuffle(false);
    }
    setLoopMode(newVal);
  }

  /**
   * Resets current song to the first song 
   * in the playlist
   */
  function resetToFirst() {
    setCurrSong(sampleData[0]);
    setCurrIndex(0);
    setPlaying(false);
    setPrevIndices([]);
    setPrevIndexSet(new Set());
  }

 /**
  * navigates to the next song on the basis of 
  * how many songs iterated through and shuffle
  * or loop mode
  */
  function navNextSong() {
    // go back to first song in the playlist and set to not playing
    if(!loopMode && prevIndexSet.size === sampleData.length) {
      resetToFirst();
    }
    // add current song to prev lists: 
    setPrevIndices(prevIndices => [...prevIndices, currIndex]);
    let currSet = new Set(prevIndexSet);
    currSet.add(currIndex);

    if(shuffle) {
      let randomIndex = Math.floor(Math.random() * sampleData.length);
      // Ensure that the same song isn't played twice even if it's 'random'
      while (randomIndex === currIndex) {
        randomIndex = Math.floor(Math.random() * sampleData.length);
      }
      setCurrIndex(randomIndex);
      setCurrSong(sampleData[randomIndex]);
    }
    else {
      let nextIndex = (currIndex + 1) % sampleData.length;
      setCurrIndex(nextIndex);
      setCurrSong(sampleData[nextIndex]); 
    }
    // automatically start playing this song
    setPlaying(true);
  }

  /**
   * Navigates to the previous song 
   * on the basis of data stored in 
   * prev lists
   */
  function navPrevSong() {
    if(prevIndices.length === 0) {
      resetToFirst();
    }
    let newIndex = prevIndices.pop();
    let newSong = sampleData[newIndex];
     

    // delete from prev data structs: 
    prevIndexSet.delete(newIndex);

    setCurrIndex(newIndex);
    setCurrSong(newSong);
  }
 
 
  return (
    <SafeAreaView style={styles.appContainer}>
      {/** Image Row */}
      <View style={styles.imageContainer}> 
        <Image source={{uri: `https://picsum.photos/300/?random&name=${currSong.title}${currSong.artist}`}}
        style={styles.albumImageStyle} />
      </View>
      {/** Spacer for a cleanrer look and feel */}
      <View style={{flex: 2}}/>
       {/** Album Text */}
      <View style={styles.albumTextContainer}>
        <Text style={[styles.albumTitle, styles.primaryAccent]}>
          {currSong.title}
        </Text>
        <Text style={[styles.artistText, styles.primaryAccent]}>
          {currSong.artist}
        </Text>
      </View>
      <AudioControls playing={playing} setPlaying={setPlaying}
      shuffle={shuffle} setShuffle={setShuffleHelper} loopMode={loopMode}
      setLoopMode={setLoopModeHelper} navNextSong={navNextSong}
      navPrevSong={navPrevSong}/>
      <ProgressBar songLength={currSong.lengthInSec} playing={playing}
      navNextSong={navNextSong}/>
        {/** Spacer for a cleanrer look and feel */}
        <View style={{flex: 0.3}}/>
    </SafeAreaView>
  );
};


export default App;