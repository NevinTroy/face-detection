import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageForm from './Components/ImageForm/ImageForm';
import Rank from './Components/Rank/Rank'
import FaceDetection  from './Components/FaceDetection/FaceDetection';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/SignIn/Register';
import 'react-particles-js'
import './App.css'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import fetch from 'node-fetch';

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
      imageURL:'',
      box:{},
      route:'signin', //route is used to track which page the user is in 
      isSignedIn:false,
      user:{
        id:'',
        name:"",
        email:"",
        entries:0,
        joined:''
      }
    }
  }
  
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }

  calculateFaceLocation=(data)=>{
    const ClarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const img=document.getElementById('FaceImage');
    const width=Number(img.width);
    const height=Number(img.width);
    /*The Clarifai API returns bounding box coordinates as 4 points: left_col,top_row,
    right_col,bottom_row. These values are given as percentages from the height or 
    width of the whole image. These values are calculated using few mathematical operations*/
    return{
      leftCol:ClarifaiFace.left_col*width,
      topRow:ClarifaiFace.top_row*height,
      rightCol:width-ClarifaiFace.right_col*width,
      bottomRow:height-ClarifaiFace.bottom_row*height
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box:box});
  }

  onSubmitChange=()=>{
    this.setState({imageURL:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response=>{
        if(response){
          fetch('http://localhost:3000/image',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
            .then(response=>response.json())
            .then(count=>{
              this.setState({user:{
                entries:count
              }})
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err=>console.log(err))
  }
  
  onRouteChange=(route)=>{
    if(route==='signout')
      this.setState({isSignedIn:false})
    else if(route==='home')
      this.setState({isSignedIn:true})

    this.setState({route:route})
  }

  render(){
    return(
      <div>
        <Particles params={particlesOptions} className='particles' />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route==='home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageForm onInputChange={this.onInputChange} onSubmitChange={this.onSubmitChange}/>
            <FaceDetection box={this.state.box}imageURL={this.state.imageURL}/>
          </div>
          :(
            this.state.route==='signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
