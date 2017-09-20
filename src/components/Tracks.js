import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Edit from 'grommet/components/icons/base/Edit';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Audio from 'react-audioplayer';

class Tracks extends Component {
	render() {
	  const audioFile = './A1.mp3';
		const song = {
			name: 'Hello World', // song name
	  	src: audioFile, // song source address
	  	img: 'http://lorempixel.com/1080/1920/abstract' // (optional) song image source address
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
						boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.28)'
					}}
				/>
		);
	}
}

export default Tracks;
