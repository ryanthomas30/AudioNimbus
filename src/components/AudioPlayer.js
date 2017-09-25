import React, { Component } from 'react';
import Audio from 'react-audioplayer';

class AudioPlayer extends Component {
	render() {
		const { song } = this.props;
		const imgFile = song.image ? song.image : 'http://lorempixel.com/500/500/abstract';
		const songObj = {
			name: song.name, // song name
			src: song.audio, // song source address
			img: imgFile // (optional) song image source address
		}
		const playList=[songObj];
		return(
			<Audio
				width={1100}
				fullPlayer={true}
				color="#865cd6"
				playlist={playList}
				style={{
					boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.28)',
				}}
			/>
		);
	}
}

export default AudioPlayer
