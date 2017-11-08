import 'react-native';
import React from 'react';

import IssueItem from '../app/components/IssueItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeAll(() => {
  require('isomorphic-fetch');
  global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

const itemData = {
  "fields": {
      "issuetype": {
          "self": "https://jira.hypers.com/rest/api/2/issuetype/1",
          "id": "1",
          "description": "测试过程，维护过程发现影响系统运行的问题。",
          "iconUrl": "https://jira.hypers.com/secure/viewavatar?size=xsmall&avatarId=11603&avatarType=issuetype",
          "name": "故障",
          "subtask": false,
          "avatarId": 11603
      },
      "components": [
          {
              "self": "https://jira.hypers.com/rest/api/2/component/10515",
              "id": "10515",
              "name": "INSIGHT-计算端"
          }
      ],
      "timespent": null,
      "timeoriginalestimate": null,
      "description": "操作步骤：\r\n\r\n1.上传文件到S3,之后触发双向映射导出的计算；\r\n\r\nPOST [http://10.123.197.138:8080/api/test/request/cs/export/users/10]\r\n\r\n\\{\r\n \"checksum\": \"b066be98d043c552d132f3aa13232dfb\",\r\n \"key\": \"uploads/users/10/tasks/308dd8d57f4db14394f3516107569352-1510041622176-8e46ffb1909b18b1.txt\",\r\n \"source\": \"IMEI\",\r\n \"target\": [\"MOBILE\",\"EMAIL\"],\r\n \"columns\":[\"SOURCE_TYPE\",\"SOURCE\",\"TARGET_TYPE\",\"TARGET\"]\r\n}\r\n\r\n \r\n\r\n实际结果：\r\n\r\n计算端返回\"down file is error\".\r\n\r\n\\{\r\n \"uuid\": \"fbc3b7e2-6317-42e9-a611-513387ebf218\",\r\n \"time\": \"1510041804833\",\r\n \"resource\": \"/task/export\",\r\n \"body\": \\{\r\n \"data\": \\{\r\n \"correlationId\": \"8599F32E515FCD4D4BADE703A68173B7\",\r\n \"status\": \"FAILED\",\r\n \"message\": \"down file is error\"\r\n }\r\n\r\n \r\n\r\n预期结果：\r\n\r\n按照实际结果正常返回。",
      "project": {
          "self": "https://jira.hypers.com/rest/api/2/project/10001",
          "id": "10001",
          "key": "DMP",
          "name": "P-DMP",
          "avatarUrls": {
              "48x48": "https://jira.hypers.com/secure/projectavatar?pid=10001&avatarId=11625",
              "24x24": "https://jira.hypers.com/secure/projectavatar?size=small&pid=10001&avatarId=11625",
              "16x16": "https://jira.hypers.com/secure/projectavatar?size=xsmall&pid=10001&avatarId=11625",
              "32x32": "https://jira.hypers.com/secure/projectavatar?size=medium&pid=10001&avatarId=11625"
          },
          "projectCategory": {
              "self": "https://jira.hypers.com/rest/api/2/projectCategory/10200",
              "id": "10200",
              "description": "",
              "name": "产品"
          }
      },
      "fixVersions": [
          {
              "self": "https://jira.hypers.com/rest/api/2/version/11003",
              "id": "11003",
              "name": "V 0.5.4",
              "archived": false,
              "released": false
          }
      ],
      "aggregatetimespent": null,
      "resolution": null,
      "customfield_10006": null,
      "customfield_10007": null,
      "aggregatetimeestimate": null,
      "resolutiondate": null,
      "workratio": -1,
      "summary": "【IDMapping--双向映射导出】触发双向映射导出后，计算端返回\"down file is error\"",
      "lastViewed": null,
      "watches": {
          "self": "https://jira.hypers.com/rest/api/2/issue/DMP-2369/watchers",
          "watchCount": 1,
          "isWatching": false
      },
      "creator": {
          "self": "https://jira.hypers.com/rest/api/2/user?username=yaqian.yu",
          "name": "yaqian.yu",
          "key": "yaqian.yu",
          "emailAddress": "yaqian.yu@hypers.com",
          "avatarUrls": {
              "48x48": "https://jira.hypers.com/secure/useravatar?ownerId=yaqian.yu&avatarId=11207",
              "24x24": "https://jira.hypers.com/secure/useravatar?size=small&ownerId=yaqian.yu&avatarId=11207",
              "16x16": "https://jira.hypers.com/secure/useravatar?size=xsmall&ownerId=yaqian.yu&avatarId=11207",
              "32x32": "https://jira.hypers.com/secure/useravatar?size=medium&ownerId=yaqian.yu&avatarId=11207"
          },
          "displayName": "于雅倩",
          "active": true,
          "timeZone": "Asia/Shanghai"
      },
      "subtasks": [],
      "created": "2017-11-07T16:31:31.000+0800",
      "reporter": {
          "self": "https://jira.hypers.com/rest/api/2/user?username=yaqian.yu",
          "name": "yaqian.yu",
          "key": "yaqian.yu",
          "emailAddress": "yaqian.yu@hypers.com",
          "avatarUrls": {
              "48x48": "https://jira.hypers.com/secure/useravatar?ownerId=yaqian.yu&avatarId=11207",
              "24x24": "https://jira.hypers.com/secure/useravatar?size=small&ownerId=yaqian.yu&avatarId=11207",
              "16x16": "https://jira.hypers.com/secure/useravatar?size=xsmall&ownerId=yaqian.yu&avatarId=11207",
              "32x32": "https://jira.hypers.com/secure/useravatar?size=medium&ownerId=yaqian.yu&avatarId=11207"
          },
          "displayName": "于雅倩",
          "active": true,
          "timeZone": "Asia/Shanghai"
      },
      "customfield_10000": null,
      "aggregateprogress": {
          "progress": 0,
          "total": 0
      },
      "priority": {
          "self": "https://jira.hypers.com/rest/api/2/priority/1",
          "iconUrl": "https://jira.hypers.com/images/icons/priorities/blocker.svg",
          "name": "P0",
          "id": "1"
      },
      "customfield_10001": null,
      "customfield_10100": null,
      "customfield_10002": "9223372036854775807",
      "customfield_10101": null,
      "customfield_10300": "0|o00ce0:",
      "labels": [],
      "environment": null,
      "timeestimate": null,
      "aggregatetimeoriginalestimate": null,
      "versions": [
          {
              "self": "https://jira.hypers.com/rest/api/2/version/11003",
              "id": "11003",
              "name": "V 0.5.4",
              "archived": false,
              "released": false
          }
      ],
      "duedate": null,
      "progress": {
          "progress": 0,
          "total": 0
      },
      "issuelinks": [],
      "votes": {
          "self": "https://jira.hypers.com/rest/api/2/issue/DMP-2369/votes",
          "votes": 0,
          "hasVoted": false
      },
      "assignee": {
          "self": "https://jira.hypers.com/rest/api/2/user?username=junwei.xu",
          "name": "junwei.xu",
          "key": "junwei.xu",
          "emailAddress": "junwei.xu@hypers.com",
          "avatarUrls": {
              "48x48": "https://jira.hypers.com/secure/useravatar?ownerId=junwei.xu&avatarId=11713",
              "24x24": "https://jira.hypers.com/secure/useravatar?size=small&ownerId=junwei.xu&avatarId=11713",
              "16x16": "https://jira.hypers.com/secure/useravatar?size=xsmall&ownerId=junwei.xu&avatarId=11713",
              "32x32": "https://jira.hypers.com/secure/useravatar?size=medium&ownerId=junwei.xu&avatarId=11713"
          },
          "displayName": "徐军伟",
          "active": true,
          "timeZone": "Asia/Shanghai"
      },
      "updated": "2017-11-07T16:31:31.000+0800",
      "status": {
          "self": "https://jira.hypers.com/rest/api/2/status/1",
          "description": "问题已经准备好让经办人开始处理。",
          "iconUrl": "https://jira.hypers.com/images/icons/statuses/open.png",
          "name": "开放",
          "id": "1",
          "statusCategory": {
              "self": "https://jira.hypers.com/rest/api/2/statuscategory/2",
              "id": 2,
              "key": "new",
              "colorName": "blue-gray",
              "name": "待办"
          }
      }
  }
}

describe('IssueItem', () => {

  test('normal', () => {
    const tree = renderer.create(
      <IssueItem
        item={itemData}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test('fidles is undefined', () => {
    const tree = renderer.create(
      <IssueItem
        item={{}}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  test('fidles is {}', () => {
    const tree = renderer.create(
      <IssueItem
        item={{fidles: {a: 1}}}
      />
    );
    expect(tree).toMatchSnapshot(); 
  });
  

});

