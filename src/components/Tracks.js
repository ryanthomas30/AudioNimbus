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

		this.state = { name: '', image: '', file: '', layerOn: false };
	}

	_closeUpload() {
		this.setState({ layerOn: false, name: '', image: '', file: '' });
	}

	_openUpload() {
		this.setState({ layerOn: true });
	}

	_handleNameChange(event) {
		this.setState({ name: event.target.value, image: this.state.image, file: this.state.file });
	}

	_handleImageChange(event) {
		let image = event.target.files[0];
		this.setState({ name: this.state.name, image: image, file: this.state.file });
	}

	_handleFileChange(event) {
		let file = event.target.files[0];
		this.setState({ name: this.state.name, image: this.state.image, file: file });
	}

	_submitForm() {
		this._closeUpload();
		const { userId, uploadTrack, getTracks } = this.props;
		const { name, image, file } = this.state
		uploadTrack(userId, name, image, file);
		getTracks(userId);
		//location.reload();
	}

	render() {
		const { songs, layerOn } = this.state;
		const { renderControls, tracks, userId, getTracks, uploadTrack } = this.props;
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
							<FormField label='Upload Track'>
								<input type="file" accept="audio/*" onChange={ (e) => this._handleFileChange(e) }/>
							</FormField>
							<FormField label='Track Name'>
								<TextInput defaultValue={name} onDOMChange={ (e) => this._handleNameChange(e) } />
							</FormField>
							<FormField label='Upload Track Image'>
								<input type="file" accept="image/*" onChange={ (e) => this._handleImageChange(e) }/>
							</FormField>
							<Footer pad={{vertical: 'medium'}}>
								<Button label='Submit' primary={true} onClick={ () => this._submitForm() } />
							</Footer>
					</Form>
				</Box>
			</Layer> : '';
		const abc = tracks ? tracks[0] : false;
		let trackList = abc ?
			tracks.map((track, i) => {
				let { filename, imagename, name } = track;
				return(
					<AudioPlayer filename={filename} imagename={imagename} name={name} key={i} />
				);
			}) : (
				<Box>
					{uploadButton}
				</Box>
			);
		return(
			<Box justify='center' align='center' pad={{ between: 'large' }} margin={{ top: 'large', bottom: 'large' }} >
				{addLayer}
				<Box pad={{ between: 'large' }} >
					{trackList}
				</Box>
			</Box>
		);
	}
}

export default Tracks;
