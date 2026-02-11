// English version of Hero data
import type { HeroEvent } from '~/types/firestore'
import { HeroEventType } from '~/types/firestore'

export const heroDataEn = [
  {
    url: 'https://placehold.co/1920x1080/0a1428/FFF?text=Fanzd.net',
    title: '',
    subtitle: '',
    quote: '',
    description: '',
    isOpening: true,
    openingText: [
      'In competitive sports, some athletes participate in games.',
      'Others, they change the game.',
      'They redefine physical limits with their bodies,',
      'forge unmatched dynasties with their will.',
      'In this art of speed and power called table tennis,',
      'we are living in such a world,',
      'a world defined by him.'
    ]
  },
  {
    url: '/images/carousel/hero-1.jpg', imgPosition: 'right top',
    title: '2016 · Germany Saarbrücken · World Cup',
    subtitle: 'First Glimpse of Brilliance — First World Cup Victory',
    quote: '"The world knows his name, but they don\'t yet understand his ambition."',
    description: 'That year, he was still just a 19-year-old boy, a gifted "challenger." But on German soil, he used pure power and desire to tear apart all predetermined scripts. This wasn\'t just a victory, it was a declaration. A prince of a new era had stepped onto his rightful territory.'
  },
  {
    url: '/images/carousel/hero-2.jpg', imgPosition: 'right top',
    title: '2018 · France Paris · World Cup',
    subtitle: 'Territorial Declaration — World Cup Defense',
    quote: '"When people think you\'ve reached the peak, you must show them that above the peak, there\'s still the sky."',
    description: 'Two years later, he was no longer the challenger; he was the one being challenged. In the legendary European stronghold, facing the thunderous support of his opponent\'s fans, he had to win to prove his dominance wasn\'t accidental. He walked into his opponent\'s palace and calmly made it his own. This was maturity, and more importantly, a statement.'
  },
  {
    url: '/images/carousel/hero-3.jpg',
    title: '2019 · China Chengdu · World Cup',
    subtitle: 'Defending the Throne — Third World Cup Victory',
    quote: '"A true king fears no challenger who comes knocking. In his kingdom, he is the law."',
    description: 'Defending is harder than winning for the first time, because it tests not talent, but will. On his home soil, pressure became something concrete, tangible. His opponents were young, fearless, eager to overthrow the old order. But Fan Zhendong showed the world through action: this era is not yet yours.'
  },
  {
    url: '/images/carousel/hero-4.jpg',
    title: '2020 · China Weihai · World Cup',
    subtitle: 'Forging Legend — Fourth World Cup, Achieving Three Consecutive Titles',
    quote: '"To become a legend, you must defeat legends. In the seventh game of the final, all technique fades away—it becomes a battle of souls."',
    description: 'Three consecutive championships. This unprecedented record was earned by defeating a god and crowning himself. He was no longer a prince; he had established his own dynasty. A seven-game epic, an ultimate test of willpower, with his opponent\'s neck under his foot.'
  },
  {
    url: '/images/carousel/hero-5.jpg', imgPosition: 'center top',
    title: '2021 · USA Houston · World Championships',
    subtitle: 'Exorcising Demons — First World Championships Victory',
    quote: '"Some trophies you don\'t win to defeat opponents, but to defeat your past self."',
    description: 'Behind the 4-0 score was the end of years of waiting. He finally grasped that "ghost" with his own hands, completing his redemption. The St. Bride\'s Cup, the crown of World Championships, was the "ghost" that had haunted his heart for years. He had come infinitely close twice, only to watch it slip through his fingers twice. This time, he allowed no accidents.'
  },
  {
    url: '/images/carousel/hero-6.jpg',
    title: '2023 · South Africa Durban · World Championships',
    subtitle: 'Legacy and Dominance — World Championships Defense',
    quote: '"The most dangerous enemy is the young one who wears the same jersey, trains with you, and knows you best."',
    description: 'He won. Proving to everyone, especially to the future: my era is not over yet. Below the throne, new heirs had already emerged. This final was both a sparring match between teammates and a ceremony of power transfer... or rather, the current king\'s renewed grip on his scepter.'
  },
  {
    url: '/images/carousel/hero-7.jpg',
    title: '2024 · France Paris · Olympics',
    subtitle: 'Royal Coronation — First Olympic Men\'s Singles Champion',
    quote: '"People always say that winning this gold medal means you have everything. But they\'re wrong. Winning it is when everything truly begins. Because from this moment, you\'re no longer the pursuer—you are the mountain."',
    description: 'The Olympics. This was the final grail, the only ticket to the pantheon. He carried the weight of an era onto the final court, facing a destined reunion with his opponent, as if history\'s script had long been written, waiting only for him to turn the final page. This wasn\'t fighting for records or titles. This was fighting for what was "deserved." The moment the gold medal hung around his neck, the bells of the Super Grand Slam rang out. Fan Zhendong—this name now stands alongside immortality. He didn\'t complete his final dance; he simply opened a new era defined by him.'
  },
  {
    url: '/images/carousel/hero-8.jpeg',
    title: '2025 · China Macau · National Games',
    subtitle: 'Return of the King — Successfully Defending National Games Title',
    quote: '"Even without the halo of world rankings, a king is still a king. True strength never needs numbers to prove it."',
    description: 'In the days without world rankings, the voices of doubt never ceased. But he chose to respond to everything with pure performance on the court. In Macau, facing the impact of a new generation, he reversed the tide in desperate situations and blossomed under pressure. His sixth National Games gold medal made him the second player after Ma Long to achieve consecutive National Games men\'s singles titles. This wasn\'t a comeback—because he never left.'
  },
  {
    url: '/images/carousel/hero-9.webp',
    title: '2026 · Germany Neu-Ulm · German Cup',
    subtitle: 'Conquering Europe — First Overseas Title',
    quote: '"When you stand at the top of the world, you can choose to stay or walk toward broader horizons."',
    description: 'Starting from Saarbrücken, he brought the spirit of Chinese table tennis onto European soil. Four matches in one day, all victories, crowned MVP. This championship belongs not only to Saarbrücken club but also to every fan who supports him. The first title of his overseas career is a new beginning and a declaration to the world: no matter where he is, he remains the warrior born for championships.'
  }
]

export const heroEventsDataEn: HeroEvent[] = [
  // === 2024 ===
  {
    date: '2024-12-27',
    year: '2024',
    title: 'Announced Withdrawal from World Rankings',
    description: 'Announced via social media the decision to withdraw from the world ranking system, but explicitly stated "will not retire" and will continue to participate in domestic tournaments and club competitions. This was a response to the WTT\'s new policy of fining players for non-participation.',
    eventType: HeroEventType.Announcement,
    location: null
  },

  // === 2025 ===
  {
    date: '2025-06-01',
    year: '2025',
    title: 'Officially Joined German Saarbrücken Club',
    description: 'Officially signed with German Saarbrücken club to join the 2025-2026 German Table Tennis Bundesliga (TTBL) and European Champions League. Base salary of 1.2 million euros, setting a new record for foreign players joining the German league.',
    eventType: HeroEventType.Transfer,
    location: 'Saarbrücken, Germany'
  },
  {
    date: '2025-09-06',
    year: '2025',
    title: 'Bundesliga Round 2 - First Victory',
    description: 'Away challenge against Bad Königshofen, Fan Zhendong defeated Zeljko Filip 3:1 in the second match and Andre Bertelsmeier 3:1 in the fourth match, achieving his first personal Bundesliga victory and helping the team win 3:0.',
    eventType: HeroEventType.Tournament,
    location: 'Germany',
    score: '3-0',
    opponent: 'Bad Königshofen'
  },
  {
    date: '2025-09-14',
    year: '2025',
    title: 'Bundesliga Round 3 - Continuing Winning Streak',
    description: 'Fan Zhendong defeated Cedric Nuytinck 3:0, helping the team easily defeat Bergneustadt 3:0.',
    eventType: HeroEventType.Tournament,
    location: 'Germany',
    score: '3-0',
    opponent: 'Bergneustadt'
  },
  {
    date: '2025-11-15',
    year: '2025',
    title: 'National Games Men\'s Singles Semi-final - Defeated Wang Chuqin',
    description: 'A peak showdown at the Galaxy Arena in Macau, Fan Zhendong defeated Wang Chuqin, then world No. 1, 4:2 to advance to the final first. This match demonstrated that Fan Zhendong remains at world-class level even without world rankings.',
    eventType: HeroEventType.Tournament,
    location: 'Macau, China'
  },
  {
    date: '2025-11-16',
    year: '2025',
    title: '15th National Games Men\'s Singles Champion - Successfully Defended',
    description: 'When opponent Lin Shidong led 9:4, Fan Zhendong came back to win 7 consecutive points to reverse the first game. Then his form exploded, winning three more games with scores of 11:5, 11:3, and 11:4 to claim the championship. This was Fan Zhendong\'s second National Games men\'s singles title, successfully defending his crown.',
    eventType: HeroEventType.WorldChampionship,
    location: 'Macau, China',
    achievements: ['National Games Men\'s Singles Champion', 'Sixth National Games Gold Medal', 'Successful Defense'],
    finalStanding: 'Champion',
    score: '4:1',
    opponent: 'Lin Shidong'
  },
  {
    date: '2025-11-16',
    year: '2025',
    title: '15th National Games Team Final - Won Individual Match Against Wang Chuqin',
    description: 'In the 15th National Games men\'s team final, Fan Zhendong defeated Wang Chuqin in his individual match, achieving a double victory over the opponent in the tournament, contributing crucial points to the team.',
    eventType: HeroEventType.Tournament,
    location: 'Macau, China',
    finalStanding: 'Runner-up',
    score: null,
    opponent: 'Beijing Team'
  },
  {
    date: '2025-12-14',
    year: '2025',
    title: 'Bundesliga Round 10 - Home Victory',
    description: 'Saarbrücken club defeated Ochsenhausen 3:0 at home, with Fan Zhendong defeating his opponent 3:0 in the second match to seal the victory for the team.',
    eventType: HeroEventType.Tournament,
    location: 'Germany',
    score: '3-0',
    opponent: 'Ochsenhausen'
  },

  // === 2026 ===
  {
    date: '2026-01-04',
    year: '2026',
    title: 'German Cup Semi-final - Winning Debut',
    description: 'In the New Year debut of the German Cup, Fan Zhendong played consecutively in the second and fourth matches, defeating 17-year-old Portuguese player Abiodun 3:1, helping the team draw 2:1 with defending champion Ochsenhausen and advance to the final.',
    eventType: HeroEventType.Tournament,
    location: 'Neu-Ulm, Germany',
    score: '3-1',
    opponent: 'Ochsenhausen'
  },
  {
    date: '2026-01-05',
    year: '2026',
    title: 'German Cup Champion - First Overseas Title',
    description: 'The German Cup final was held in Neu-Ulm, Germany on the 4th. In the first match, Fan Zhendong swept German star Ovtcharov 3:0 to give Saarbrücken an early lead. In the fourth match, Fan Zhendong defeated Filus 3:0 to seal the victory for the team. Four victories in one day, named MVP. This is the first championship since Fan Zhendong joined Saarbrücken club.',
    eventType: HeroEventType.WorldChampionship,
    location: 'Neu-Ulm, Germany',
    achievements: ['German Cup Champion', 'First Overseas Title', 'MVP'],
    finalStanding: 'Champion',
    score: '3-1',
    opponent: 'Fulda-Maberzell'
  },
  {
    date: '2026-01-13',
    year: '2026',
    title: 'Bundesliga Round 12 - Scored 2 Points in Defeat',
    description: 'In Bundesliga Round 12, Saarbrücken lost 2:3 to Dortmund at home. Fan Zhendong defeated Mino 3:0 in the second match and world champion Karlsson 3:0 in the fourth match, scoring 2 points alone, but teammates lost successively, and the team ultimately fell.',
    eventType: HeroEventType.Tournament,
    location: 'Germany',
    score: '2-3',
    opponent: 'Dortmund'
  },
  {
    date: '2026-02-20',
    year: '2026',
    title: 'Champions League Quarter-final First Leg - 3:0 Victory',
    description: 'In the first leg of the Champions League quarter-final, Fan Zhendong came from behind to defeat French star Simon Gauzy 3:2 in the second match, helping the team win 3:0 away against French Hennebont, gaining the upper hand in the two-legged tie.',
    eventType: HeroEventType.Tournament,
    location: 'France',
    score: '3-0',
    opponent: 'Hennebont, France'
  }
]
