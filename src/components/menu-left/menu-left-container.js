import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { addProject, addGroup } from '../../actions';
import { projectsSelector } from '../../selectors';

import MenuLeft from './menu-left';

class MenuLeftContainer extends Component {
  constructor() {
    super();
    this.state = {
      showAddProjectForm: false,
    };
    this.onAddProject = this.onAddProject.bind(this);
    this.onCloseAddProjectForm = this.onCloseAddProjectForm.bind(this);
    this.onSubmitProject = this.onSubmitProject.bind(this);
    this.addGroup = this.addGroup.bind(this);
  }

  onAddProject() {
    this.setState({ showAddProjectForm: true });
  }

  onCloseAddProjectForm() {
    this.setState({ showAddProjectForm: false });
  }

  onSubmitProject(label) {
    this.setState({ showAddProjectForm: false });
    if (label.length > 0) {
      this.props.addProject(label);
    }
  }

  addGroup(label, parentId) {
    this.props.addGroup(label, parentId);
  }

  render() {
    const { projects } = this.props;
    const { showAddProjectForm } = this.state;
    return (
      <MenuLeft
        projects={projects}
        showAddProjectForm={showAddProjectForm}
        onAddProject={this.onAddProject}
        addGroup={this.addGroup}
        onSubmitProject={this.onSubmitProject}
        onCloseAddProjectForm={this.onCloseAddProjectForm}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    projects: projectsSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: bindActionCreators(addProject, dispatch),
    addGroup: bindActionCreators(addGroup, dispatch),
  };
};

const ConnectedMenuLeft = connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuLeftContainer));

export default ConnectedMenuLeft;
