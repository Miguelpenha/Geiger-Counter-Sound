import { useNavigation } from '@react-navigation/native'
import ContainerPd from '../../components/ContainerPd'
import { Header, ContainerSettings, Settings, Title } from './style'
import { Audio, AVPlaybackStatus } from 'expo-av'
import { useEffect, useState } from 'react'
import soundLevels from './soundLevels'
import Slider from '@react-native-community/slider'
import { useTheme } from 'styled-components'
import { View, Text, Switch } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

interface IPlayer {
  sound: Audio.Sound
  status: AVPlaybackStatus
}

export default function Home() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [soundLevel, setSoundLevel] = useState<number>(1)
  const [automatic, setAutomatic] = useState(false)
  const [sound, setSound] = useState<IPlayer>()
  const [volume, setVolume] = useState(0.2)
  const [delayAutomatic, setDelayAutomatic] = useState(3000)

  useEffect(() => {
    async function playSound() {
      if (!sound) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          playThroughEarpieceAndroid: false
        })

        const player = await Audio.Sound.createAsync(soundLevels[soundLevel], {
          isLooping: true,
          volume: volume
        })

        setSound(player)

        await player.sound.playAsync()
      } else {
        sound.status.isLoaded && await sound.sound.unloadAsync()

        await sound.sound.loadAsync(soundLevels[soundLevel], {
          isLooping: true,
          volume: volume
        })

        await sound.sound.playAsync()
      }
    }

    playSound().then()
  }, [soundLevel, automatic])

  useEffect(() => {
    automatic && setTimeout(() => {
      if (soundLevel === 1) {
        setSoundLevel(2)
      } else if (soundLevel === 2) {
        setSoundLevel(3)
      } else if (soundLevel === 3) {
        setSoundLevel(1)
      }
    }, delayAutomatic)
  }, [soundLevel, automatic])

  useEffect(() => {
    async function changeVolume() {
      sound && await sound.sound.setVolumeAsync(volume)
    }

    changeVolume().then()
  }, [volume])

  return (
    <ContainerPd>
      <Header>
        <ContainerSettings onPress={() => navigation.navigate('Settings')}>
          <Settings name="settings" size={40}/>
        </ContainerSettings>
      </Header>
      <Title>Som do contador Geiger</Title>
      <Text style={{fontSize: RFPercentage(3), color: theme.primary, alignSelf: 'center', marginTop: '5%'}}>Volume</Text>
      <Slider
        step={0.1}
        value={volume}
        minimumValue={0}
        maximumValue={1}
        onValueChange={setVolume}
        thumbTintColor={theme.primary}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.secondary}
        style={{width: 200, height: 50, alignSelf: 'center'}}
      />
      <Text style={{fontSize: RFPercentage(3), color: theme.primary, alignSelf: 'center'}}>Nível</Text>
      <Slider
        step={1}
        minimumValue={1}
        maximumValue={3}
        value={soundLevel}
        onValueChange={setSoundLevel}
        thumbTintColor={theme.primary}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.secondary}
        style={{width: 200, height: 50, alignSelf: 'center'}}
      />
      <View style={{marginTop: '2%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: '2%'}}>
        <Text style={{fontSize: RFPercentage(4), color: theme.primary, lineHeight: RFPercentage(4)}}>Automático</Text>
        <Switch
          value={automatic}
          style={{marginLeft: '1%'}}
          onChange={() => setAutomatic(!automatic)}
          thumbColor={automatic ? theme.primary : theme.primary}
          trackColor={{false: theme.secondary, true: theme.secondary}}
        />
      </View>
      <Text style={{fontSize: RFPercentage(3), color: theme.primary, alignSelf: 'center'}}>Delay (Automático)</Text>
      <Slider
        step={1}
        minimumValue={1500}
        maximumValue={10000}
        value={delayAutomatic}
        thumbTintColor={theme.primary}
        onValueChange={setDelayAutomatic}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.secondary}
        style={{width: 200, height: 30, alignSelf: 'center', marginTop: '2%'}}
      />
      <Text style={{fontSize: RFPercentage(3), color: theme.primary, alignSelf: 'center', marginBottom: '5%'}}>{Number(delayAutomatic/1000).toFixed(2)} segundos de delay</Text>
    </ContainerPd>
  )
}