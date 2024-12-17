import React from 'react';
import { ColumnLayout, ControlContentWrapper, GroupHeading, RadioRowLayout } from '../styles/appStyle';

export const LabelPanel = ({ labels, setLabels }) => {
  return (
    <ControlContentWrapper>
      {' '}
      <ColumnLayout>
        <GroupHeading> Show Labels On:</GroupHeading>
        <RadioRowLayout>
          <input
            type="radio"
            name="all"
            value="all"
            checked={labels == 'all'}
            onChange={(e) => setLabels(e.target.value)}
          />
          <label htmlFor="all">All Countries</label>
        </RadioRowLayout>
        <RadioRowLayout>
          <input
            type="radio"
            name="selected"
            value="selected"
            checked={labels == 'selected'}
            onChange={(e) => setLabels(e.target.value)}
          />
          <label htmlFor="selected">Selected Countries</label>
        </RadioRowLayout>
        <RadioRowLayout>
          <input
            type="radio"
            name="none"
            value="none"
            checked={labels == 'none'}
            onChange={(e) => setLabels(e.target.value)}
          />
          <label htmlFor="none">None</label>
        </RadioRowLayout>
      </ColumnLayout>{' '}
    </ControlContentWrapper>
  );
};
