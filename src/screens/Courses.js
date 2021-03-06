import React, {Component} from 'react';
import {Body, Button, Container, Content, Fab, Header, Icon, Left, List, Right, Title} from 'native-base';
import {CourseListElement} from '../components/CourseListElement';
import {connect} from 'react-redux';
import {getCourses} from '../actions/courses';

class CoursesScreen extends Component {
    componentWillMount() {
        this.props.dispatch(getCourses())
    }

    render() {
        return (
            <Container>
                <Content style={{backgroundColor: '#fff'}}>
                    <List dataArray={this.props.courses}
                          renderRow={(course) =>
                              <CourseListElement
                                  onPress={() => this.props.navigation.navigate('Course', {id: course._id})}
                                  key={course._id} course={course}
                              />
                          } />
                </Content>
                <Fab style={{backgroundColor: '#5067FF'}}
                     position="bottomRight"
                     onPress={() => this.props.navigation.navigate('AddCourse')}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        );
    }
}

let elem = <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
    <Icon name="options"/>
</Button>;

CoursesScreen.navigationOptions = ({navigation}) => ({
    header: (
        <Header>
            <Left />
            <Body>
            <Title>Dostępne kursy</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => navigation.dispatch(getCourses())}>
                    <Icon name="refresh"/>
                </Button>
                <Button transparent onPress={() => navigation.navigate('Settings')}>
                    <Icon name="settings"/>
                </Button>
            </Right>
        </Header>
    )
});

const mapStateToProps = state => {
    return {
        courses: state.courses
    };
};

const Courses = connect(mapStateToProps)(CoursesScreen);
export default Courses;