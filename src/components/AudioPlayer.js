import React, { Component } from 'react';
import Audio from 'react-audioplayer';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { API_ROOT } from '../actions/api-config';

class AudioPlayer extends Component {

	_submitComment(userId, trackId, comment) {
		const { submitComment } = this.props;
		// Found something other than a space or line break
		if (/\S/.test(comment)) {
			submitComment(userId, trackId, comment);
		}
	}



	render() {
		const { name, imagename, filename, trackId, userId, comments } = this.props;
		const imageURL = imagename ? `${API_ROOT}files/${imagename}` : 'http://lorempixel.com/500/500/abstract';
		const songURL = `${API_ROOT}files/${filename}`;
		const songObj = {
			name: name, // song name
			src: songURL, // song source address
			img: imageURL, // (optional) song image source address
			comments: []
		}
		const playList=[songObj];
		const renderComments = comments.map((comment, i) => {
			return(
				<ListItem justify='between' pad='small' separator='bottom' key={i} >
					<Box>
						{comment}
					</Box>
				</ListItem>
			);
		});
		const playerWidth = 1100;
		return(
			<Box>
				<Box align='center' >
					<Audio
						width={playerWidth}
						fullPlayer={true}
						color="#865cd6"
						playlist={playList}
						comment={true}
						onCommentSubmit={comment => this._submitComment(userId, trackId, comment)}
						style={{
							boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.28)',
						}} />
				</Box>
				<Box style={{ maxWidth: `${playerWidth}px` }} >
					<Accordion >
						<AccordionPanel heading='Comments'  >
							<List>
								{renderComments}
							</List>
						</AccordionPanel>
					</Accordion>
				</Box>
		</Box>
		);
	}
}

export default AudioPlayer
