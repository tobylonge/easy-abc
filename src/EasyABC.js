import React, {Component} from 'react';
import alphabets from './alphabets.json';
class EasyABC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabets: alphabets,
            currentPostion: 0,
            currentTick: 0,
            random: false,
            sound: true
        };
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.playSound = this.playSound.bind(this);
        this.switchRandom = this.switchRandom.bind(this);
        this.switchSound = this.switchSound.bind(this);
        this.manualPlaySound = this.manualPlaySound.bind(this);
    }

    componentDidMount() {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        if(this.state.currentPostion === 0) {
            letterSound.currentTime = 0;
            letterSound.play();
        }
    }

    componentDidUpdate() {
        this.playSound();
    }

    manualPlaySound() {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        let wordSound = document.querySelector(`audio[data-key="word"]`);
        if (this.state.currentTick === 0) {
                letterSound.currentTime = 0;
                letterSound.play();
            } else {
                wordSound.currentTime = 0;
                wordSound.play();
            }
    }

    playSound() {
        let letterSound = document.querySelector(`audio[data-key="letter"]`);
        let wordSound = document.querySelector(`audio[data-key="word"]`);

        console.log('play sound');

        if (this.state.sound) {
            if (this.state.currentTick === 0) {
                letterSound.currentTime = 0;
                letterSound.play();
            } else {
                wordSound.currentTime = 0;
                wordSound.play();
            }
        }
    }

    randomNumber (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    next() {
        if (this.state.random) {
            if (this.state.currentTick < 2) {
                this.setState({currentTick: this.state.currentTick + 1});
            } else {
                this.setState({currentPostion: this.randomNumber(0,25), currentTick: 0});
            }
            
        } else {
            if (this.state.currentPostion === 25 ) {
                this.setState({currentPostion: 0});
                if (this.state.currentTick < 2) {
                    this.setState({currentTick: this.state.currentTick + 1});
                } else {
                    this.setState({currentPostion: 0, currentTick:  0});
                }
            } else {
                if (this.state.currentTick < 2) {
                    this.setState({currentTick: this.state.currentTick + 1})
                } else {
                    this.setState({currentPostion: this.state.currentPostion + 1, currentTick:  0});
                }
            }
        }
        
        //  this.playSound();
    }
     prev() {
        if (this.state.currentPostion > 0 ) { 
            this.setState({currentPostion: this.state.currentPostion - 1});
        } else {
            this.setState({currentPostion: 25});
        } 

    }

    switchRandom() {
        this.setState({random: !this.state.random});
    }
    switchSound() {
        this.setState({sound: !this.state.sound});
    }
    
    render() {
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showWord = this.state.currentTick === 2 ? true : false;
        return (
           <div className="game">
               <span className="random-label">Random Letters:</span>
               <label className="switch">
                   <input type="checkbox"
                          onClick={this.switchRandom}
                          defaultValue = "false"
                          checked={this.state.random}/>
                    <div className="slider round"></div>
                </label>
                <span className="random-label">Sound:</span>
               <label className="switch">
                   <input type="checkbox"
                          onClick={this.switchSound}
                          defaultValue = "false"
                          checked={this.state.sound}/>
                    <div className="slider round"></div>
                </label>
               <div className="option">
                   <div className="fields">
                       <div className="field-block">
                           {this.state.alphabets[this.state.currentPostion].letter}
                       </div>
                       <audio src={this.state.alphabets[this.state.currentPostion].letterSound}
                       data-key="letter"/>
                    </div>
                    <div className="buttons">
                        <a className="button prev" onClick={this.prev}>Previous</a>
                        <a className="button sound" onClick={this.manualPlaySound}>Play Sound Again</a>
                        <a className="button next" onClick={this.next}>Next</a>
                    </div>
                    <div className="fields">
                        <div className="field-block">
                            <div className="left-field">
                                <div className={`placeholder-span ${showImage && "hide"}`}>
                                    Click Next to view Image
                                </div>
                                <img className={`letter-image ${!showImage && "hide"}`} 
                                src={this.state.alphabets[this.state.currentPostion].image}
                                alt={this.state.alphabets[this.state.currentPostion].word}
                                />
                                <audio src={this.state.alphabets[this.state.currentPostion].wordSound}
                                data-key="word"/>
                            </div>
                            <div className="right-field">
                                <div  className={`placeholder-span ${showWord && "hide"}`}>
                                    Click Next to view the spelling
                                </div>
                                 <div className={`word ${!showWord && "hide"}`}>
                                    {this.state.alphabets[this.state.currentPostion].word.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EasyABC;