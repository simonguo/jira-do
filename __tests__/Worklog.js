import 'react-native';
import React from 'react';

import WorklogItem, { formatSecond } from '../app/components/WorklogItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const mockItem = {
  "self": "https://jira.hypers.com/rest/api/2/issue/28093/worklog/21632",
  "author": {
      "self": "https://jira.hypers.com/rest/api/2/user?username=jianbo.yu",
      "name": "jianbo.yu",
      "key": "jianbo.yu",
      "emailAddress": "jianbo.yu@hypers.com",
      "avatarUrls": {
          "48x48": "https://jira.hypers.com/secure/useravatar?ownerId=jianbo.yu&avatarId=11718",
          "24x24": "https://jira.hypers.com/secure/useravatar?size=small&ownerId=jianbo.yu&avatarId=11718",
          "16x16": "https://jira.hypers.com/secure/useravatar?size=xsmall&ownerId=jianbo.yu&avatarId=11718",
          "32x32": "https://jira.hypers.com/secure/useravatar?size=medium&ownerId=jianbo.yu&avatarId=11718"
      },
      "displayName": "喻建博",
      "active": true,
      "timeZone": "Asia/Shanghai"
  },
  "updateAuthor": {
      "self": "https://jira.hypers.com/rest/api/2/user?username=jianbo.yu",
      "name": "jianbo.yu",
      "key": "jianbo.yu",
      "emailAddress": "jianbo.yu@hypers.com",
      "avatarUrls": {
          "48x48": "https://jira.hypers.com/secure/useravatar?ownerId=jianbo.yu&avatarId=11718",
          "24x24": "https://jira.hypers.com/secure/useravatar?size=small&ownerId=jianbo.yu&avatarId=11718",
          "16x16": "https://jira.hypers.com/secure/useravatar?size=xsmall&ownerId=jianbo.yu&avatarId=11718",
          "32x32": "https://jira.hypers.com/secure/useravatar?size=medium&ownerId=jianbo.yu&avatarId=11718"
      },
      "displayName": "喻建博",
      "active": true,
      "timeZone": "Asia/Shanghai"
  },
  "comment": "",
  "created": "2017-10-24T18:50:01.000+0800",
  "updated": "2017-10-24T18:50:01.000+0800",
  "started": "2017-10-24T18:49:00.000+0800",
  "timeSpent": "4h",
  "timeSpentSeconds": 14400,
  "id": "21632",
  "issueId": "28093"
}

describe('Worklog', () => {

  test('formatSecond', () => {
    expect(formatSecond(3600)).toBe('1 小时');
    expect(formatSecond(1800)).toBe('0.5 小时');
    expect(formatSecond(360)).toBe('0.1 小时');
  });

  it('WorklogItem', () => {
    const tree = renderer.create(
      <WorklogItem
        item={mockItem}
      />
    );
    expect(tree).toMatchSnapshot();
  });

});

