import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import QuestPicker from '../../../src/components/Quest/QuestPicker';
import rootReducer from '../../../src/redux/reducers/index';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

storiesOf('QuestPicker', module)
  .addDecorator(story => {
    return (
      <Provider store={store}>
        {story()}
      </Provider>
    );
  })
  .add('Normal', () => {
    return (
      <QuestPicker isLoading={false} />
    );
  })
  .add('Loading', () => {
    return (
      <QuestPicker isLoading={true} />
    );
  });