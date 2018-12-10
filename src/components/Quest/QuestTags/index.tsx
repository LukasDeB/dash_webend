import * as React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { Quest } from '@/models';

export interface QuestTagsProps {
  quests: Quest[];
}

class QuestTags extends React.PureComponent<QuestTagsProps, {}> {
  render() {
    return (
      <div style={{ margin: '10px auto' }}>
        {
          this.props.quests.map(itm => (
            <Label key={`quest_tags_${itm.id}`}>
              <Icon name="trophy" />
              {itm.name}
            </Label>
          ))
        }
      </div>
    );
  }
}

export default QuestTags;
