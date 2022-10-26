import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { trackedFunction } from 'ember-resources';
import { action } from '@ember/object';

function getUser(id) {
  // Artificial delay: if id is 2, we want to simulate a slow response.
  let delay = id === 2 ? 1000 : 50;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id });
    }, delay)
  });
}

export default class UsersListComponent extends Component {
  userIds = [1, 2, 3];

  @tracked userId = 1;

  userLoader = trackedFunction(this, async () => {
    return getUser(this.userId);
  });

  @action
  updateUserId(id) {
    this.userId = id;
  }
}
