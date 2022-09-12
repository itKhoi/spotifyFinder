import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios";
import Song from './Song';
import ProgressBar from './soundgraph/ProgressBar';

export default function TrackPage() {
    const [listID, setID] = useState(useParams().id);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [tracks, setTracks] = useState([]);
    const [trackIDs, setTrackIDs] = useState([]);
    const [gotTracks, setGotTracks] = useState(false);
    const [queryReady, setQuery] = useState(false);
    const [soundVals, setSounds] = useState([])
    const [audioFeatures, setAudioFeatures] = useState({
      acousticness : 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      speechiness: 0,
      valence: 0
    })
    const [tempo, setTempo] = useState(0)
    const [flag, setFlag] = useState(false);
    //acousticness, danceability, energy, instrumentalness, speechiness, tempo, valence
    // const [trackIDs, setTrackIDs] = useState([]);
    useEffect(()=>{
        const fetchSongs = async () => {
          // console.log(`https://api.spotify.com/v1/playlists/${listID}`)
          setToken(window.localStorage.getItem("token"));

          var response = await axios.get(`https://api.spotify.com/v1/playlists/${listID}/tracks`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              params: {
                // limit: '200'
              }
            }
          );
          setTracks(response.data.items)
          // console.log(response)
          var counter = 0
          while(response.data.next != null){
            response = await axios.get(`https://api.spotify.com/v1/playlists/${listID}/tracks`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                params: {
                  offset: counter*100 + 100,
                  limit: 100
                }
              }
            );
            setTracks(oldArray => [...oldArray, ...response.data.items])
            counter += 1;
          };
          setGotTracks(prev => !prev)
        }
        fetchSongs()


    },[])
    useEffect(()=>{
      const fetchAnalysis = () =>{
        setTrackIDs([])
        tracks.map(track => {
          if(track.track){
            if(track.track.id){
              setTrackIDs(oldTracks => [...oldTracks, track.track.id])
            }
          }
        })
      }
      fetchAnalysis()
      setQuery(prev => !prev)
    }, [gotTracks])
    useEffect(() =>{
      const getSoundMetrics = () =>{
        var queryString = []
        trackIDs.map((track,idx, arr) => {
          if(arr.length - 1 == idx || idx % 100 == 0 && idx !== 0){
            axios.get(`https://api.spotify.com/v1/audio-features`,{
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `application/json`
              },
              params: {
                ids: queryString.join()
              }
            }).then((response)=>{
              setSounds(prev => [...prev, ...response.data.audio_features])
              console.log(response.data.audio_features)
              //acousticness, danceability, energy, instrumentalness, speechiness, tempo, valence
            }).catch()
            queryString = [];
          }
          queryString.push(track);
        })
        setFlag(prev => !prev)
        }

      getSoundMetrics();
      
    }, [queryReady])
    useEffect(()=>{
      const calculateFeatures = () =>{
        var acousticness1 = 0
        var danceability1 = 0
        var energy1 = 0
        var instrumentalness1 = 0
        var speechiness1 = 0 
        var tempo1 = 0
        var valence1 = 0
        soundVals.map((sound, idx)=>{

          acousticness1 += sound.acousticness;
          danceability1 += sound.danceability;
          energy1 += sound.energy;
          instrumentalness1 += sound.instrumentalness;
          speechiness1 += sound.speechiness;
          tempo1 += sound.tempo;
          valence1 += sound.valence
          
        })
        let len = soundVals.length
        setAudioFeatures({
          acousticness: acousticness1/len,
          danceability: danceability1/len,
          energy: energy1/len,
          instrumentalness: instrumentalness1/len,
          speechiness: speechiness1/len,
          valence: valence1/len
        })
        setTempo(tempo1/len)
      }
      calculateFeatures()
      },[soundVals])
  return (
    <div>
        {tracks.map((track,idx)=>(
          // console.log(idx, track.track)
          // console.log(tracks.slice(0,100))
          <div> {track.track ? <Song track = {track.track} idx={idx}/> : null}</div>
        ))}
        {/* {
          // console.log(tracks)
          trackIDs.map((track,idx) => (
            <p>{idx}. {track}</p>
          ))
        } */}
        {
          <ul>
            <li>acousticness : {audioFeatures.acousticness}</li>
            <li>danceability : {audioFeatures.danceability}</li>
            <li>energy: {audioFeatures.energy}</li>
            <li>instrumentalness : {audioFeatures.instrumentalness}</li>
            <li>speechiness : {audioFeatures.speechiness}</li>
            {/* <li>tempo : {audioFeatures.tempo}</li> */}
            <li>valence : {audioFeatures.valence}</li>
          </ul>
        }
        <div className='acoustic-graph'>
          {/* <ProgressBar name='Acousticness' value={audioFeatures.acousticness}/>
          <ProgressBar name='Danceability' value={audioFeatures.danceability}/>
          <ProgressBar name='Energy' value={audioFeatures.energy}/>
          <ProgressBar name='Instrumentalness' value={audioFeatures.instrumentalness}/>
          <ProgressBar name='Speechiness' value={audioFeatures.speechiness}/>
          {/* <ProgressBar name='Tempo' value={audioFeatures.tempo}/>
          <ProgressBar name='Valence' value={audioFeatures.valence}/> */}
          <ProgressBar audioFeatures = {audioFeatures}/>
        </div>
    </div>
  )
}
