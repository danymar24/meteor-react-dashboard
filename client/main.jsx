import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { RoutesContainer } from '../imports/ui/Routes';

Meteor.startup(() => {
  render(<RoutesContainer />, document.getElementById('react-target'));
});
