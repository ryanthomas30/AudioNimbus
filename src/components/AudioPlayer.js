import React, { Component } from 'react';
import Audio from 'react-audioplayer';

class AudioPlayer extends Component {
	render() {
		const audioFile = './A1.mp3';
		const song = {
			name: 'Hello World', // song name
			src: audioFile, // song source address
		img: 'http://lorempixel.com/1920/1080/abstract' // (optional) song image source address
		//comments: an commentObj array // (optional) comments to display of that song
		}
		const playList=[song];
		return(
			<Audio
				width={500}
				fullPlayer={true}
				color="#00BFA5"
				playlist={playList}
				style={{
					boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.28)',
				}}
			/>
		);
	}
}

export default AudioPlayer
