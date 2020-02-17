const fetch = require("node-fetch");

const {motivatingQuotes} = require("./motivating-quotes");

const team = {
  meafmira: '@o.nechiporenko',
  ElinRin: '@e.denisova',
  nkt: '@nkt',
  dmitryshelomanov: '@d.shelomanov',
  olegshilov: '@oleg',
  mnasyrov: '@m.nasyrov',
  arturtakoev: '@a.takoev',
  rtyurin: '@r.tyurin',
  TyaglovOV: '@o.tyaglov',
  'a-shabanov': '@a.shabanov',
  pvlv: '@i.pavlov',
  jvoychenko: '@y.voychenco'
};

const requestUrl = 'https://api.github.com/repos/dialogs/dialog-web-platform/pulls';
fetch(requestUrl, {
  headers: {
    Authorization: `token ${process.env.AUTH_TOKEN}`,
    Accept: 'application/vnd.github.shadow-cat-preview+json'
  }
})
  .then((data) => data.json())
  .then((response) => {
    const result = [];

    if (response.message) {
      console.error(`Incorrect GITHUB request: ${response.message}`);
      process.exit(1);
    }

    response.forEach((pr) => {
      const isWIP = pr.labels.some(label => label.name === 'wip');
      const isStale = pr.labels.some(label => label.name === 'stale');
      const isDependencies = pr.labels.some(label => label.name === 'dependencies');

      const withoutReviewers = (pr.requested_reviewers.length === 0 && pr.requested_teams.length === 0);
      if (pr.locked || pr.draft || isWIP || isDependencies) {
        return
      }
      const prData = {
        title: pr.title,
        url: pr.html_url,
        user: pr.user,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        requested_reviewers: pr.requested_reviewers,
        requested_teams: pr.requested_teams,
        isStale,
        withoutReviewers
      };

      if (isStale) {
        result.unshift(prData);
      } else {
        result.push(prData);
      }
    });

    const needReviewPRs = result.filter(pr => !pr.withoutReviewers);
    const needWorkPRs = result.filter(pr => pr.withoutReviewers);
    let message = `Всем привет👋🏼\n`;
    if (needReviewPRs.length > 0) {
      message += `У нас осталось ${needReviewPRs.length} непроверенных PR🤔\n\n`
      needReviewPRs.forEach((pr) => {
        message += `- ${pr.isStale ? '🖍' : ''}${pr.title}\n${pr.url}\n`;
        let reviewers = ``;
        pr.requested_reviewers.forEach((reviewer) => {
          reviewers += `${team[reviewer.login]} `;
        });
        if (pr.requested_teams.some(team => team.name === 'Web')) {
          reviewers += `+всем из dialogs/web `;
        }
        message += reviewers + `\n\n`
      });
    }
    if (needWorkPRs.length > 0) {
      message += '\n--------\nА эти PR ждут решительных действий:\n';
      needWorkPRs.forEach((pr) => {
        message += `- ${pr.title}\n${pr.url}\n${team[pr.user.login]}\n\n`;
      })
    }
    if (needReviewPRs.length === 0 && needWorkPRs.length === 0) {
      message += `ВАУ! Все PR разобраны!🤩\nХорошего дня!🤗`;
      console.log(message);
      return;
    }
    message += `\nИ помните:\n${motivatingQuotes[Math.floor(Math.random() * motivatingQuotes.length)]}\nХорошего дня!🤗`;
    console.log(message);
  })
  .catch((err) => {
    console.error(`Request failed: ${err.message}`);
    process.exit(1);
  });
