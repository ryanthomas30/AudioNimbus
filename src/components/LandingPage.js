import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';



class LandingPage extends Component {

  render() {
    return(
      <Box>

      <Article scrollStep={true}
        controls={true}>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'>
          <Headline margin='none'>
            What is AudioNimbus ?
          </Headline>
          <Paragraph size='medium'>
            AudioNimbus is an audio distribution web application for uploading music, podcasts, and other audio, enabling users to share their original audio content. It will be built in a Node.js environment, along with Express.js, MongoDB, and React. This will enable us to use JavaScript for both client-side and server-side environments.
          </Paragraph>
        </Section>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'
          colorIndex='accent-1-a'>
          <Headline margin='none'>
            You should be able to:
          </Headline>
          <Paragraph size='medium'>
          1. Create a profile page containing audio content.
          </Paragraph>
          <Paragraph size='medium'>
          2. Personalize your profile page.
          </Paragraph>
          <Paragraph size='medium'>
          3. Upload audio content to your profile.
          </Paragraph>
          <Paragraph size='medium'>
          4. View audio content on other user profiles.
          </Paragraph>
          <Paragraph size='medium'>
          5. Listen to audio content on a custom player.
          </Paragraph>
        </Section>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'>
          <Headline margin='none'>
            Section 3
          </Headline>
        </Section>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'
          colorIndex='accent-1-a'>
          <Headline margin='none'>
            Section 4
          </Headline>
        </Section>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'>
          <Headline margin='none'>
            Section 5
          </Headline>
        </Section>
      </Article>
      </Box>

    );
  }
}

export default LandingPage;
