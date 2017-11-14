import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import About from './About';
import Tracks from './Tracks';
import HeaderBar from './HeaderBar';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Profile extends Component {

	constructor(props) {
		super(props);

		this._changeImage = this._changeImage.bind(this);
	}

	componentWillMount() {
		this.props.getUserId();
		this.props.getAbout(this.props.match.params.routeId);
		this.props.getTracks(this.props.match.params.routeId);
	}

	_changeImage(inputImage) {
		this.setState({ image: inputImage });
	}

	render () {
		const { userId, about, updateAbout, getAbout, tracks, uploadTrack, getTracks, postComment } = this.props;
		const { routeId } = this.props.match.params;
		const renderControls = routeId === userId;
		let imageURL = 'http://lorempixel.com/1920/1080/abstract';
		if(about) {
			if(about.image) {
				imageURL = about.image;
			}
		}
		return (
			<Box>
				<HeaderBar routesMatch={renderControls} />
				<Hero background={<Image src={imageURL}
					fit='cover'
					full={true} />}
					size='small' />
				<Tabs justify='start'>
					<Tab title='Tracks'>
						<Tracks renderControls={renderControls} tracks={tracks} routeId={routeId}
						 	getTracks={getTracks} uploadTrack={uploadTrack} postComment={postComment} />
					</Tab>
					<Tab title='About'>
						<About renderControls={renderControls} updateAbout={updateAbout}
							about={about} getAbout={getAbout} userId={userId} routeId={routeId}
							changeImage={this._changeImage} imageURL={imageURL}/>
					</Tab>
				</Tabs>
			</Box>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated,
		userId: state.auth.userId,
		about: state.profile.about,
		tracks: state.profile.tracks
	};
}

export default connect(mapStateToProps, actions)(Profile);
