import * as React from 'react';
import { Icon } from 'semantic-ui-react';

const SavingsIcon = props => (
  <div>
    <Icon.Group {...props}>
      <Icon name="money bill alternate" />
      <Icon name="plus circle" inverted={true} corner={true} />
    </Icon.Group>
  </div>
);
export default SavingsIcon;