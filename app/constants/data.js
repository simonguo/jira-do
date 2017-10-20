
const status = {
  '待办': [1, 4, 10100],
  '处理中': [3, 5],
  '完成': [6, 10002]
}

const statusJSON = [
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/1',
    'description': '问题已经准备好让经办人开始处理。',
    'iconUrl': 'https://jira.hypers.com/images/icons/statuses/open.png',
    'name': '开放',
    'id': '1',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/2',
      'id': 2,
      'key': 'new',
      'colorName': 'blue-gray',
      'name': '待办'
    }
  },
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/3',
    'description': '此问题正在被经办人积极处理。',
    'iconUrl': 'https://jira.hypers.com/images/icons/statuses/inprogress.png',
    'name': '处理中',
    'id': '3',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/4',
      'id': 4,
      'key': 'indeterminate',
      'colorName': 'yellow',
      'name': '处理中'
    }
  },
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/4',
    'description': '此问题已得到解决后, 但被视为不正确。这里的问题是标记为 “已分配” 或 “已解决。',
    'iconUrl': 'https://jira.hypers.com/images/icons/statuses/reopened.png',
    'name': '重新打开',
    'id': '4',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/2',
      'id': 2,
      'key': 'new',
      'colorName': 'blue-gray',
      'name': '待办'
    }
  },
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/5',
    'description': '一项决议已采取了各种措施, 它正在等待验证的记者。这里的问题是重新打开或是关闭的。',
    'iconUrl': 'https://jira.hypers.com/images/icons/statuses/resolved.png',
    'name': '已解决',
    'id': '5',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/4',
      'id': 4,
      'key': 'indeterminate',
      'colorName': 'yellow',
      'name': '处理中'
    }
  },
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/6',
    'description': '这一问题被认为是完成, 这项决议是正确的。问题已关闭可以重新开放。',
    'iconUrl': 'https://jira.hypers.com/images/icons/statuses/closed.png',
    'name': '已关闭',
    'id': '6',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/3',
      'id': 3,
      'key': 'done',
      'colorName': 'green',
      'name': '完成'
    }
  },
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/10002',
    'description': '',
    'iconUrl': 'https://jira.hypers.com/images/icons/subtask.gif',
    'name': '完成',
    'id': '10002',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/3',
      'id': 3,
      'key': 'done',
      'colorName': 'green',
      'name': '完成'
    }
  },
  {
    'self': 'https://jira.hypers.com/rest/api/2/status/10100',
    'description': '',
    'iconUrl': 'https://jira.hypers.com/images/icons/subtask.gif',
    'name': '待办',
    'id': '10100',
    'statusCategory': {
      'self': 'https://jira.hypers.com/rest/api/2/statuscategory/2',
      'id': 2,
      'key': 'new',
      'colorName': 'blue-gray',
      'name': '待办'
    }
  }
]