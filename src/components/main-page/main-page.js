import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import ItemList from '../item-list';
import ConnectedMenuLeft from '../menu-left';
import TaskForm from '../task-form';

import './main-page.sass';


const MainPage = () => {
  return (
    <Fragment>
      <ConnectedMenuLeft />
      <main className="main">
        <Route
          path="/app/group/:groupId/"
          render={({ match, history }) => {
            const { groupId } = match.params;
            return (
              <ItemList
                groupId={groupId}
                history={history}
                match={match}
              />
            );
          }}
        />

      </main>
      <Route
        path="/app/group/:groupId/task/:taskId/:parentId?"
        render={({ match, history }) => {
          const { taskId, parentId } = match.params;
          return (
            <TaskForm
              itemId={taskId}
              groupId={parentId}
              history={history}
              match={match}
            />
          );
        }}
      />
    </Fragment>
  );
};

export default MainPage;
