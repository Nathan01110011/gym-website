import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import axios from "axios";
import { getConfig } from "./util/animationConfig";
import { parseData } from "./util/parseData";

export default class Display extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      gymData: "",
      parsedData: ""
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
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <ParticlesBg type='custom' config={getConfig()} bg={true} />
        <div className='content'>
          <div className='upper-text'>
            <h1 className='main-title'>{this.state.parsedData.header}</h1>
          </div>
          <div className='lower-div'>
            <h2 className='lower-text'>{this.state.parsedData.footer}</h2>
          </div>
        </div>
      </div>
    );
  }
}
