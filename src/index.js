const fetch = require("node-fetch");

const team = {
  meafmira: '@o.nechiporenko',
  ElinRin: '@e.denisova',
  nkt: '@nkt',
  dmitryShelomanov: '@d.shelomanov ',
  olegshilov: '@oleg',
  mnasyrov: '@m.nasyrov',
  arturtakoev: '@a.takoev',
  rtyurin: '@r.tyurin',
  TyaglovOV: '@o.tyaglov',
  'shabanov-dlg': '@a.shabanov',
  pvlv: '@i.pavlov',
};

const SS = [
  '«Перестаньте сравнивать свою первую главу с моей пятнадцатой. Мы все на разных главах своей жизни», — Джон Рэмптон.',
  '«Делай. Или не делай. Не надо пытаться», — мастер Йода.',
  '«Начните оттуда, где вы сейчас находитесь. Используйте то, что у вас есть, и делайте все, что можете», — Артур Эш.',
  '«Всегда выкладывайся на полную. Что посеешь — то и пожнешь», — Ог Мандино',
  '«Многое кажется невозможным, пока ты этого не сделаешь», — Нельсон Мандела.',
  '«Я — не результат обстоятельств. Я — результат собственных решений», — Стивен Кови.',
  '«Сила происходит не от побед. Силу порождает борьба. Когда вы проходите через трудности и решаете не сдаваться — это и есть сила», — Арнольд Шварценеггер.',
  '«Достижения нужно измерять препятствиями, которые вам пришлось преодолеть, чтобы достичь своих целей». — Букер Т. Вашингтон',
  '«Притворяйся, пока не получится! Делай вид, что ты настолько уверен в себе, насколько это необходимо, пока не обнаружишь, что так оно и есть», — Брайан Трейси',
  '«Отправной точкой всех достижений является желание», — Наполеон Хилл',
  '«Я не потерпел неудачу. Я просто нашёл 10 тыс. вариантов, которые не работают», — Томас Эдисон.',
  '«Если вы не готовы рискнуть обычным, вам придется довольствоваться заурядным», — Джим Рон.',
  '«Не спрашивайте, в чем нуждается мир, — спросите себя, что наполняет вас жизнью. Миру нужны люди, наполненные жизнью», — Говард Трумэн. ',
  '«Не ноша тянет вас вниз, а то, как вы ее несете», — Лу Хольц. ',
  '«Возможности не приходят сами — вы создаете их», — Крис Гроссер. ',
  '«Лучший способ взяться за что-то — перестать говорить и начать делать». — Уолт Дисней ',
  '«Успех — это способность терпеть поражение за поражением без потери энтузиазма», — Уинстон Черчилль. ',
  '«Хотите знать, кто вы? Не спрашивайте. Действуйте! Действие будет описывать и определять вас», — Томас Джефферсон. ',
  '«Люди забудут, что вы говорили, люди забудут, что вы делали, но люди никогда не забудут, какие чувства вы у них вызвали», — Майя Анжелу. ',
  '«Не позволяйте дню вчерашнему отнять слишком много у дня сегодняшнего», — Уилл Роджерс. ',
  '«Всякий раз, когда вы видите успешного человека, вы замечаете лишь славу, окружающую его, но не то, чем он пожертвовал ради этого», — Вайбхав Шах.',
  '«Избегайте тех, кто пытается подорвать вашу веру в себя. Эта черта свойственна мелким людям. Великий человек, наоборот, внушает вам чувство, что и вы можете стать великим», — Марк Твен.',
  '«На свете нет ничего абсолютно ошибочного. Даже сломанные часы дважды в сутки показывают точное время», — Пауло Коэльо. ',
  '«Прыгай — и сеть появится», — Джон Берроуз. ',
  '«Если вы думаете, что способны выполнить что-то, или думаете, что не способны на это, вы правы в обоих случаях», — Генри Форд. ',
  '«Важно не то, сбили ли тебя с ног, — важно то, поднялся ли ты снова», — Винс Ломбарди. ',
  '«Страсть — ключ к мотивации, но только решимость и готовность к безжалостной погоне за своей целью позволит вам достичь успеха, к которому вы стремитесь», — Марио Андретти. ',
  '«Стремитесь быть не самым успешным, а самым ценным». — Альберт Эйнштейн ',
  '«Чтобы выиграть, вы должны поверить, что вы этого достойны», — Майк Дитка. ',
  '«Если вы смотрите на то, чем жизнь наградила вас, у вас всегда будет достаточно. Если вы концентрируетесь на том, чего вам недодали, вам всегда буде чего-то не хватать», — Опра Уинфри. ',
  '«Если вы работаете над тем, что для вас действительно важно, вас не приходится подгонять. Вас тянет вперед ваша мечта», — Стив Джобс. ',
  '«Ничем в мире нельзя заменить упорство. Его не может заменить талант — никого не встретишь так часто, как талантливого неудачника. Его не может заменить гениальность — непризнанные гении почти вошли в пословицу. Одного образования тоже недостаточно — мир полон образованных изгоев. Только упорство и решимость всесильны. Фраза „работай дальше“ была и остается решением всех проблем человеческой расы», — Калвин Кулидж. ',
  '«Я не могу изменить направление ветра, но могу развернуть паруса так, что всегда доберусь туда, куда мне нужно», — Джимми Дин',

  '«Гениальность может оказаться лишь мимолетным шансом. Только работа и воля могут дать ей жизнь и обратить ее в славу», - Альберт Камю',
  '«Жить — значит работать. Труд есть жизнь человека», — Вольтер',
  '«Постарайтесь получить то, что любите, иначе придется полюбить то, что получили», — Бернард Шоу',
  '«Работа, которую мы делаем охотно, исцеляет боли», — Уильям Шекспир',
  '«Делай что можешь, с тем, что у тебя есть, там, где ты находишься», — Теодор Рузвельт',
  '«Всегда помните о том, что ваша решимость преуспеть важнее всего остального», — Авраам Линкольн',
  '«Кто хочет – ищет возможности. Кто не хочет – ищет причины», — Сократ',
  '«Любовь и работа - единственные стоящие вещи в жизни. Работа - это своеобразная форма любви», — Мэрилин Монро',
  '«Есть только один вид работы, который не вызывает депрессии, — это работа, которую ты не обязан делать», — Жорж Элгози',
  '«Я твердо верю в удачу, и я заметил: чем больше я работаю, тем я удачливее», — Томас Джефферсон',
  '«Вдохновение приходит только во время работы», — Габриэль Маркес',
  '«Понуждай сам свою работу; не жди, чтобы она тебя понуждала», — Бенджамин Франклин',
  '«Если вы будете работать для настоящего, то ваша работа выйдет ничтожной; надо работать имея в виду только будущее», — Антон Чехов',
  '«Кто делает не больше того, за что ему платят, никогда не получит больше того, что он получает», — Элберт Хаббард',
  '«Обычно те, кто лучше других умеет работать, лучше других умеют не работать», — Жорж Элгози',
  '«Самая тяжелая часть работы — решиться приступить к ней», — Габриэль Лауб',
  '«Самый несчастный из людей тот, для кого в мире не оказалось работы», — Томас Карлейль',
  '«Лучше работать без определенной цели, чем ничего не делать», — Сократ',

];

const requestUrl = 'https://api.github.com/repos/dialogs/dialog-web-platform/pulls';
fetch(requestUrl, {
  headers: {
    Authorization: 'token c6b2b2f8e47983f2ce46efa3aceeb126addf4274',
    Accept: 'application/vnd.github.shadow-cat-preview+json'
  }
})
  .then((data) => data.json())
  .then((prList) => {
    const result = [];

    prList.forEach((pr) => {
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
    let message = `Всем привет👋🏼\nУ нас осталось ${needReviewPRs.length} непроверенных PR. Давайте не затягивать с их проверкой🤔\n\n`;
    needReviewPRs.forEach((pr) => {
      message += `- ${pr.title}\n${pr.url}\n`;
      let reviewers = ``;
      pr.requested_reviewers.forEach((reviewer) => {
        reviewers += `${team[reviewer.login]} `;
      });
      if (pr.requested_teams.some(team => team.name === 'Web')) {
        reviewers += `+всем из dialogs/web `;
      }
      message += reviewers + `\n\n`
    });
    if (needWorkPRs.length > 0) {
      message += '\n--------\nА эти PR ждут решительных действий:\n';
      needWorkPRs.forEach((pr) => {
        message += `- ${pr.title}\n${pr.url}\n${team[pr.user.login]}\n\n`;
      })
    }
    message += `\nИ помните:\n${SS[Math.floor(Math.random() * SS.length)]}\nХорошего дня!🤗`;

    console.log(message);
  });
