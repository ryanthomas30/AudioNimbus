import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Add from 'grommet/components/icons/base/Add';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import AudioPlayer from './AudioPlayer';

class Tracks extends Component {
	constructor(props) {
		super(props);

		this.state = { songs: [], songObj: { name: '', image: '', audio: '' }, layerOn: false };
	}

	_closeUpload() {
		this.setState({ layerOn: false, songObj: { name: '', image: '', audio: '' }});
	}

	_openUpload() {
		this.setState({ layerOn: true });
	}

	_handleNameChange(event) {
		this.setState({ songObj: { name: event.target.value, image: this.state.songObj.image, audio: this.state.songObj.audio }});
	}

	_handleImageChange(event) {
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
			this.setState({ songObj:{name: this.state.songObj.name, image: reader.result, audio: this.state.songObj.audio }});
		}
		reader.readAsDataURL(file);
	}

	_handleAudioChange(event) {
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
			this.setState({ songObj: { name: this.state.songObj.name, image: this.state.songObj.image, audio: reader.result }});
		}
		reader.readAsDataURL(file);
	}

	_submitForm() {
		this._closeUpload();
		this.state.songs.push(this.state.songObj);
	}

	render() {
		const { songs, layerOn } = this.state;
		const { renderControls, tracks, userId } = this.props;
		const noSongsLabel = renderControls ? 'You have no songs.' : 'No songs to display.';
		const uploadButton = renderControls ? (
			<Box justify='center' >
				<Label align='center' >{noSongsLabel}</Label>
				<Button icon={<Add />}
					primary={true}
					label='Add Track'
					onClick={() => this._openUpload()} />
			</Box>
			) : (
				<Box justify='center' >
					<Label align='center' >{noSongsLabel}</Label>
				</Box>
			);
		const addLayer = layerOn ?
			<Layer closer={true}
				align='center'
				onClose={() => this._closeUpload()} >
				<Box size='xlarge'
						 full={true}>
					<Form onSubmit={() => this._submitForm()} >
							<Header>
								<Heading margin='medium'>
									Upload Track
								</Heading>
							</Header>
							<FormField label='Track Name'>
								<TextInput defaultValue={name} onDOMChange={ (e) => this._handleNameChange(e) } />
							</FormField>
							<FormField label='Upload Track Image'>
								<input type="file" accept="image/*" onChange={ (e) => this._handleImageChange(e) }/>
							</FormField>
							<FormField label='Upload Track'>
								<input type="file" accept="audio/*" onChange={ (e) => this._handleAudioChange(e) }/>
							</FormField>
							<Footer pad={{vertical: 'medium'}}>
								<Button label='Submit' primary={true} onClick={ () => this._submitForm() } />
							</Footer>
					</Form>
				</Box>
			</Layer> : '';
		const trackList = songs[0] ?
			songs.map(song => {
				return(
					<AudioPlayer song={song} />
				);
			}) : (
				<Box>
					{uploadButton}
				</Box>
			);
		return(
			<Box justify='center' align='center' pad={{ between: 'large' }} margin='medium' >
				{addLayer}
				<Box>
					{trackList}
				</Box>
			</Box>
		);
	}
}

export default Tracks;
