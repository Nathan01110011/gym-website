import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import axios from "axios";
import { getConfig } from "./util/animationConfig";
import { parseData } from "./util/parseData";
import Img from 'react-image';
import lazy from './img/lazy.gif';
import gym from './img/gym.gif';

export default class Display extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      gymData: "",
      parsedData: "",
      img: ""
    };
  }

  componentDidMount() {
    this.getGymData();
  }

  async getGymData() {
    await axios({
      method: "GET",
      url:
        "https://6l0a656249.execute-api.eu-west-1.amazonaws.com/default/getLatestGymTimes",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*"
      }
    })
      .then(response => {
        this.setState({ gymData: response.data.Items[0] });
        this.setState({ parsedData: parseData(this.state.gymData) });
        this.setImg();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setImg() {
    if (this.state.parsedData.today === true) {
      this.setState({img : gym});
    } else {
      this.setState({img : lazy});
    }
  }

  render() {
    return (
      <div>
        <ParticlesBg type='custom' config={getConfig()} bg={true} />
        <div className='content'>
        <div className='leading-text'>
            <h3 className='main-title'>Was Nathan at the gym today???</h3>
          </div>
          <Img className='display-img' src={this.state.img} alt="gif"/>
          <div>
            <h1 className='upper-text'>{this.state.parsedData.header}</h1>
          </div>
          <div>
            <h2 className='lower-text'>{this.state.parsedData.footer}</h2>
          </div>
          <div className='github'>
            <a href='https://github.com/NathanScott101/gym-website'>github</a>
          </div>
        </div>
      </div>
    );
  }
}
