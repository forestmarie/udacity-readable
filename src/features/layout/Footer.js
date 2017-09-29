import React from "react";
import { Segment, Container, Grid, List, Header, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Connect" />
              <List link inverted>
                <List.Item>
                  <a
                    href="https://www.facebook.com/forest.marie"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name="facebook" />
                  </a>
                </List.Item>
                <List.Item>
                  <a
                    href="https://www.linkedin.com/in/forestmarie/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name="linkedin" />
                  </a>
                </List.Item>
                <List.Item>
                  <a
                    href="https://github.com/forestmarie"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name="github" />
                  </a>
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={13}>
              <Header as="h4" inverted>
                Readable Project - Udacity React NanoDegree course
              </Header>
              <p>© 2017 Forest Marie All Rights Reserved</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
