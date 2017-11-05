import React, { Component } from 'react';
import Audio from 'react-audioplayer';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { API_ROOT } from '../actions/api-config';

class AudioPlayer extends Component {



	render() {
		const { name, imagename, filename, trackId, submitComment, userId, comments } = this.props;
		const imageURL = imagename ? `${API_ROOT}files/${imagename}` : 'http://lorempixel.com/500/500/abstract';
		const songURL = `${API_ROOT}files/${filename}`;
		const songObj = {
			name: name, // song name
			src: songURL, // song source address
			img: imageURL, // (optional) song image source address
			comments: []
		}
		const playList=[songObj];
		const mockData = ['This song is bad', 'Please quit music', 'Stop playing please', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'];
		console
		const renderComments = comments.map((comment, i) => {
			return(
				<ListItem justify='between' pad='small' separator='bottom' key={i} >
					<Box>
						{comment}
					</Box>
				</ListItem>
			);
		});
		return(
			<Box>
				<Box align='center' >
					<Audio
						width={1100}
						fullPlayer={true}
						color="#865cd6"
						playlist={playList}
						comment={true}
						onCommentSubmit={comment => submitComment(userId, trackId, comment)}
						style={{
							boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.28)',
						}} />
				</Box>
				<Box style={{ maxWidth: '1100' }} >
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
