import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderContainer = styled.div`
  background-color: ${Colors['gray-1']};
  padding: 60px 40px;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 35px 40px 40px;
  flex-grow: 1;
`;

const FooterContainer = styled.div`
  background-color: ${Colors['gray-1']};
  padding: 40px;
`;

interface IMainTemplateProps {
  Header: React.ComponentType,
  Footer: React.ComponentType,
}

export class MainTemplate extends React.Component<IMainTemplateProps, {}> {
  render() {
    const { Header, Footer } = this.props;
    return (
      <Wrapper>
        <HeaderContainer>
          <Header/>
        </HeaderContainer>
        <ContentContainer>
          {this.props.children}
        </ContentContainer>
        <FooterContainer>
          <Footer/>
        </FooterContainer>
      </Wrapper>
    );
  }
}