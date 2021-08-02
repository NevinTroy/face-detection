import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageForm from './Components/ImageForm/ImageForm';
import Rank from './Components/Rank/Rank'
import FaceDetection  from './Components/FaceDetection/FaceDetection';
import 'react-particles-js'
import './App.css'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app=new Clarifai.App({
  apiKey:'8b62678146e8475b981e11396efd0ba1'
});

const particlesOptions={
  particles:{
    number:{
      value:100,
      density:{
        enable:true,
        value_area:800
      }
    },
    line_linked:{
      enable_auto:true,
      distance:150
    }
  },
  interactivity:{
    onhover:{
      enable:true,
      mode:'bubble'
    }
  }
}
class App extends React.Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:''
    }
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }
  onSubmitChange=()=>{
    this.setState({imageURL:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err){

      }
    );
  }
  render(){
    return(
      <div>
        <Particles params={particlesOptions} className='particles' />
        <Navigation />
        <Logo />
        <Rank />
        <ImageForm onInputChange={this.onInputChange} onSubmitChange={this.onSubmitChange}/>
        <FaceDetection imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
