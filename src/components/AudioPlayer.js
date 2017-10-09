import React, { Component } from 'react';
import Audio from 'react-audioplayer';

class AudioPlayer extends Component {
	render() {
		const ROOT_URL = 'http://localhost:3090';
		const { name, imagename, filename } = this.props;
		const imageURL = imagename ? `${ROOT_URL}/files/${imagename}` : 'http://lorempixel.com/500/500/abstract';
		const songURL = `${ROOT_URL}/files/${filename}`;
		const songObj = {
			name: name, // song name
			src: songURL, // song source address
			img: imageURL // (optional) song image source address
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
