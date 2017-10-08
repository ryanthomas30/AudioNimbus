import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Article from 'grommet/components/Article';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';


class LandingPage extends Component {

  render() {
    return(
      <Box>
      <Header fixed={false}
              float={false}
              size='xlarge'
              splash={false}>
      <Title>
      Sample Title
      </Title>
      <Box flex={true}
      justify='start'
      direction='row'
      responsive={false}>
      </Box>
      </Header>
      <Article scrollStep={true}
        controls={true}>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'>
          <Headline margin='none'>
            Section 1
          </Headline>
        </Section>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'
          colorIndex='grey-4'>
          <Headline margin='none'>
            Section 2
          </Headline>
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
          colorIndex='grey-4'>
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
