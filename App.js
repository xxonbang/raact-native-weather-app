import React from 'react';
import {Alert} from 'react-native';
import Loading from './loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './weather';

const API_KEY = '4de463dd96b5bc819612b2b9d206b15c';

export default class extends React.Component {

  state = {
    isLoading: true
  };

  getWeather = async(latitude, longitude) => {
    const { data: {main : {temp}, weather} } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);
    this.setState({ isLoading: false, condition: weather[0].main, temp })
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      // this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert('to use this weather app, you need to select ALLOW option');
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, condition, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
