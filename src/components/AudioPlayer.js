import React, { Component } from 'react';
import Audio from 'react-audioplayer';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';

import { API_ROOT } from '../actions/api-config';

class AudioPlayer extends Component {
	render() {
		console.log('apiroot: ' + API_ROOT);
		const { name, imagename, filename } = this.props;
		const imageURL = imagename ? `${API_ROOT}files/${imagename}` : 'http://lorempixel.com/500/500/abstract';
		const songURL = `${API_ROOT}files/${filename}`;
		const songObj = {
			name: name, // song name
			src: songURL, // song source address
			img: imageURL // (optional) song image source address
		}
		const playList=[songObj];
		return(
			<Box>
				<Audio
					width={1100}
					fullPlayer={true}
					color="#865cd6"
					playlist={playList}
					style={{
						boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.28)',
					}}
				/>
				<Accordion>
					<AccordionPanel heading='Comments' >
						Hey it geg
					</AccordionPanel>
				</Accordion>
		</Box>
		);
	}
}

export default AudioPlayer
