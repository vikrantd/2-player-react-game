import React from 'react'
import Pilot from './Pilot'
import Gun from './Gun'
import Player from './Player'
import Info from './Info'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:55550');

var id
var keyCodeTimestamps = {};

class App extends React.Component{
  constructor(){
    super()
    let gameWindowWidth = 800;
    let arr=[]
    for(let i=0;i<20;i++){
      arr.push([false, 0, 10])
    }
    this.state={
      p1score: 0,
      p2score: 0,
      round: 1,
      pilotpos: (window.innerWidth - gameWindowWidth)/2,
      pilotdepth: 10,
      pilotnum: 0,
      key39: false,
      key40: false,
      key65: false,
      key68: false,
      key76: false,
      soldiers: arr,
      soldiersReleased: 0,
      gunangle: 0,
      bullets: [],
      frameStartPos: 0,
      frameEndPos: gameWindowWidth,
      gameWidth: gameWindowWidth,
      isPaused: false
    }
    this.resume = this.resume.bind(this);
  }

  resume() {
    this.setState({
      isPaused: false
    })
  }

  frameUpdate = () => {
    if(!this.state.isPaused) {
      this.setState(prev => {
        
        let p1=prev.p1score
        let p2=prev.p2score
        const speed=prev.key39?8:5
        let pos=prev.pilotpos+speed
        const dec=prev.key40?1:0
        let newdepth=prev.pilotdepth+dec
        let depth=newdepth>=150?150:newdepth
        let newpilot=prev.pilotnum
        let soldarr=prev.soldiers.map(item => {
          if(item[0])
          {
            let soldepth=item[2]+4
            if(item[2]<700 && soldepth>=700)
            {
              if(prev.round===1)
              {
                p1+=2
              }
              if(prev.round===2)
              {
                p2+=2
              }
            }
            soldepth=soldepth>=700?700:soldepth
            return [true, item[1], soldepth]
          }
          else{
            return item
          }
        })

        let gunangle=prev.gunangle
        if(prev.key65){
          gunangle-=2
        }
        if(prev.key68){
          gunangle+=2
        }
        gunangle=gunangle>=90?90:gunangle
        gunangle=gunangle<=-90?-90:gunangle
        
        let newbullets=prev.bullets.map(item => [item[0]+10*item[2], item[1]-10*item[3], item[2], item[3]])
        newbullets=newbullets.filter(item => item[0]<1550 && item[0]>0 && item[1]>0)
        let newreleased=prev.soldiersReleased

        if(pos>prev.frameEndPos && newpilot<4){
          pos=prev.frameStartPos
          depth=10
          newpilot+=1
          newreleased=newpilot*4
        }

        if(pos>prev.frameEndPos && newpilot===4){
          if(prev.round===1)
          {
            let arr=[]
              for(let k=0;k<20;k++){
                arr.push([false, 0, 10])
              }
              prev.isPaused = true;
              // alert('Change positions, round 1 Over')
              return {p1score: p1,
                p2score: p2,
                round: 2,
                pilotpos: prev.frameStartPos,
                pilotdepth: 10,
                pilotnum: 0,
                key39: false,
                key40: false,
                key65: false,
                key68: false,
                key76: false,
                soldiers: arr,
                soldiersReleased: 0,
                gunangle: 0,
                bullets: []} 

          }
          if(prev.round===2)
          {
            const str=p1>p2?1:2
              alert('Player 1: '+p1+'    Player 2: '+p2)
              alert('Game Over!! Payer '+str+ ' wins! Plese Refresh')
              clearInterval(id)
          }
          
        }

        let c=0
        for(let it=0;it<soldarr.length; it++)
        {
          if(soldarr[it][0] && soldarr[it][2]>=700)
          {
            c++
          }        
        }
        if(c>=4)
        {
          if(prev.round===1)
          {
            p1+=50
            let arr=[]
              for(let k=0;k<20;k++){
                arr.push([false, 0, 10])
              }
              prev.isPaused = true;
              // alert('Change positions, round 1 Over')
              return {p1score: p1,
                p2score: p2,
                round: 2,
                pilotpos: prev.frameStartPos,
                pilotdepth: 10,
                pilotnum: 0,
                key39: false,
                key40: false,
                key65: false,
                key68: false,
                key76: false,
                soldiers: arr,
                soldiersReleased: 0,
                gunangle: 0,
                bullets: []} 

          }
          if(prev.round===2)
          {
            p2+=50
            const str=p1>p2?1:2
              alert('Player 1: '+p1+'    Player 2: '+p2)
              alert('Game Over!! Payer '+str+ ' wins! Plese Refresh')
              clearInterval(id)
          }
        }
        
        for(let i=0;i<newbullets.length;i++)
        {

          for(let j=0;j<soldarr.length;j++)
          {
            if(soldarr[j][0] && soldarr[j][2]<700 && Math.abs(newbullets[i][0]-soldarr[j][1])<10 && Math.abs(newbullets[i][1]-soldarr[j][2])<10)
            {
              soldarr[j][0]=false
              if(prev.round===1)
              {
                p2+=1
              }
              if(prev.round===2)
              {
                p1+=1
              }
            }
          }

          if(Math.abs(newbullets[i][0]-pos)<30 && Math.abs(newbullets[i][1]-depth)<10)
          {
            if(prev.round===1)
            {
              p2+=5            
            }
            if(prev.round===2)
            {
              p1+=5            
            }
            newbullets.splice(i,1)          
            if(newpilot===4 && prev.round===1){
              let arr=[]
              for(let k=0;k<20;k++){
                arr.push([false, 0, 10])
              }
              depth=-500
              prev.isPaused = true;
              // alert('Change positions, round 1 Over')
              return {p1score: p1,
                p2score: p2,
                round: 2,
                pilotpos: prev.frameStartPos,
                pilotdepth: 10,
                pilotnum: 0,
                key39: false,
                key40: false,
                key65: false,
                key68: false,
                key76: false,
                soldiers: arr,
                soldiersReleased: 0,
                gunangle: 0,
                bullets: []}            
            }
            if(newpilot===4 && prev.round===2){
              depth=-500
              const str=p1>p2?1:2
              alert('Player 1: '+p1+'    Player 2: '+p2)
              alert('Game Over!! Payer '+str+ ' wins! Plese Refresh') 
              clearInterval(id)
            }
            if(newpilot<4){
              pos=prev.frameStartPos
              depth=10
              newpilot+=1
              newreleased=newpilot*4
            }
          }
        }

        return {pilotpos: pos, pilotdepth:depth, pilotnum: newpilot, soldiers: soldarr, gunangle:gunangle, bullets: newbullets, p1score: p1, p2score: p2, soldiersReleased: newreleased}
      })
    }
  }

  componentDidMount(){
    id=setInterval(this.frameUpdate, 40)
    document.onkeydown = (e) => {
      const keyname='key'+e.keyCode
      if((e.keyCode===39 || e.keyCode===40 || e.keyCode===68 || e.keyCode===65) && !this.state.isPaused){
        this.setState({[keyname]: true})
        keyCodeTimestamps[keyname] = {};
        keyCodeTimestamps[keyname].startTimeStamp = Date.now();
      }
      else if(e.keyCode===32 || e.keyCode === 76){
        keyCodeTimestamps[keyname] = {};
        keyCodeTimestamps[keyname].startTimeStamp = Date.now();
      }
    }
    document.onkeyup = (e) => {
      const keyname='key'+e.keyCode
      if(!this.state.isPaused && e.keyCode===76 && this.state.soldiersReleased<this.state.pilotnum*4+4)
      {
        this.setState(prev => {
          let newlist=prev.soldiers.map(item => item)
          newlist[prev.soldiersReleased]=[true, prev.pilotpos, prev.pilotdepth]
          return {soldiersReleased: prev.soldiersReleased+1, soldiers: newlist}
        })
        keyCodeTimestamps[keyname].endTimestamp = Date.now();
        keyCodeTimestamps[keyname].keyCode = keyname;
        keyCodeTimestamps[keyname].player = this.state.round === 1 ? "Player 2" : "Player 1";
        socket.emit('recordKey', keyCodeTimestamps[keyname]);
      }

      if(!this.state.isPaused && e.keyCode===32)
      {
        this.setState(prev => {
          let bull=prev.bullets
          const deg=(this.state.gunangle*Math.PI)/180
          bull.push([this.state.frameStartPos + (this.state.gameWidth / 2), 700, Math.sin(deg), Math.cos(deg)])
          return {bullets: bull}
        })
        keyCodeTimestamps[keyname].endTimestamp = Date.now();
        keyCodeTimestamps[keyname].keyCode = keyname;
        keyCodeTimestamps[keyname].player = this.state.round === 1 ? "Player 1" : "Player 2";
        socket.emit('recordKey', keyCodeTimestamps[keyname]);
      }

      if(!this.state.isPaused && (e.keyCode===39 || e.keyCode===40)){
        const keyname='key'+e.keyCode
        this.setState({[keyname]: false})
        keyCodeTimestamps[keyname].endTimestamp = Date.now();
        keyCodeTimestamps[keyname].keyCode = keyname;
        keyCodeTimestamps[keyname].player = this.state.round === 1 ? "Player 2" : "Player 1";
        socket.emit('recordKey', keyCodeTimestamps[keyname]);
      }

      if(!this.state.isPaused && (e.keyCode===68 || e.keyCode===65)){
        const keyname='key'+e.keyCode
        this.setState({[keyname]: false})
        keyCodeTimestamps[keyname].endTimestamp = Date.now();
        keyCodeTimestamps[keyname].keyCode = keyname;
        keyCodeTimestamps[keyname].player = this.state.round === 1 ? "Player 1" : "Player 2";
        socket.emit('recordKey', keyCodeTimestamps[keyname]);
      }
    }
  }

  render(){
    let tempsoldierArr=this.state.soldiers.map(item => {
      const elem=item[0]?<div className='soldier' key={item} style={{position: 'absolute', top: 10 + item[2], left: item[1]}}></div>:'empty'
      return elem
    })
    const soldierArr=tempsoldierArr.filter(item => item!=='empty')
    const bulletarray=this.state.bullets.map(item => <div className='bullet' key={item} style={{top: item[1] - 10 + Math.abs(this.state.gunangle/4.2), left: 14 + (this.state.gunangle*15/45) + item[0]}}></div>)
    return(
      <div className="game-window">
        <Player className="player" score={this.state.p1score} playerName={"Player 1"}></Player>
        <div className='screen' style={{width: this.state.gameWidth}}>
          <Pilot position={this.state.pilotpos} depth={this.state.pilotdepth} />
          {soldierArr}
          <Gun angle={this.state.gunangle} leftPos={this.state.frameStartPos + (this.state.gameWidth / 2)} />
          {bulletarray}
          <Info resume={this.resume} isPaused={this.state.isPaused}></Info>
        </div>
        <Player className="player" score={this.state.p2score} playerName={"Player 2"}></Player>
      </div>
    )
  }
}


export default App