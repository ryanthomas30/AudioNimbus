import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Add from 'grommet/components/icons/base/Add';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';

import AudioPlayer from './AudioPlayer';
import UploadTrack from './UploadTrack';

class Tracks extends Component {
	constructor(props) {
		super(props);

		this.state = { name: '', image: '', file: '', layerOn: false };

		this._submitComment = this._submitComment.bind(this);
		this._closeUpload = this._closeUpload.bind(this);
	}

	_closeUpload() {
		this.setState({ layerOn: false });
	}

	_openUpload() {
		this.setState({ layerOn: true });
	}

	_submitComment(routeId, trackId, comment) {
    const { postComment } = this.props;
    postComment(routeId, trackId, comment);
  }

	render() {
		const { layerOn } = this.state;
		const { renderControls, tracks, routeId } = this.props;
		const noSongsLabel = renderControls ? 'You have no songs.' : 'No songs to display.';
		const uploadButton = renderControls ? (
			<Box justify='center' align='center' >
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
		const addLayer =
			<Layer closer={true}
				align='center'
				onClose={() => this._closeUpload()}
				hidden={!layerOn}	>
				<UploadTrack closeUpload={this._closeUpload} routesMatch={renderControls} />
			</Layer>;
		const tracksExist = tracks ? tracks[0] : false;
		let trackList = tracksExist ?
			tracks.map((track, i) => {
				let { filename, imagename, name, _id, comments } = track;
				return(
					<AudioPlayer filename={filename} imagename={imagename} name={name} key={i}
						trackId={_id} routeId={routeId} comments={comments} submitComment={this._submitComment} />
				);
			}) : (
				<Box>
					{uploadButton}
				</Box>
			);
		return(
			<Box justify='center' align='center' pad={{ between: 'large' }} margin={{ top: 'large', bottom: 'large' }} >
				{addLayer}
				<Box pad={{ between: 'large' }} style={{ width: '100%' }} >
					{trackList}
				</Box>
			</Box>
		);
	}
}

export default Tracks;
