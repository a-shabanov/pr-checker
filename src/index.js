const requestUrl = 'https://api.github.com/repos/dialogs/dialog-web-platform/pulls';
fetch(requestUrl, {headers: {Authentication: 'token c6b2b2f8e47983f2ce46efa3aceeb126addf4274'}})
  .then((data) => data.json())
  .then((prList) => console.debug({prList}));
