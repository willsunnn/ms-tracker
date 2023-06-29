import { FaBars } from 'react-icons/fa6'

interface ExternalLink {
  name: string
  url: string
}

interface ExternalLinkGroup {
  name: string
  links: ExternalLink[]
}

export const ExternalLinksButton = () => {
  const links: ExternalLinkGroup[] = [
    {
      name: 'Savior',
      links: [
        {
          name: 'Patch Notes',
          url: 'https://maplestory.nexon.net/news/83731/updated-6-15-v-242-savior-khali-wind-of-vengeance-patch-notes'
        },
        {
          name: 'Coin Shop Tracker',
          url: 'https://whackybeanz.com/calc/coin-events/savior'
        },
        {
          name: 'Rock Paper Scissors Helper',
          url: 'http://agrodesu.com/maple/RPS/'
        }
      ]
    },
    {
      name: 'Gear Calculators',
      links: [
        {
          name: 'General Reboot Gear Guide',
          url: 'https://docs.google.com/presentation/d/1cvwscy79thl_jahbjQlw60KzIiEEYUFd7gBwqajACfY/edit#slide=id.p'
        },
        {
          name: 'Starforce Calculator by Suckhard',
          url: 'https://brendonmay.github.io/starforceCalculator/'
        },
        {
          name: 'Cubing Calculator by Suckhard',
          url: 'https://brendonmay.github.io/cubingCalculator/'
        },
        {
          name: 'Flame Calculator by Suckhard',
          url: 'https://brendonmay.github.io/flameCalculator/'
        },
        {
          name: 'Flame Tiers for Weapons',
          url: 'https://strategywiki.org/wiki/MapleStory/Bonus_Stats#Attack_Power_increase_(Weapons)'
        },
        {
          name: 'Cube Rates (old cubes)',
          url: 'https://docs.google.com/spreadsheets/d/1od_hep5Y6x2ljfrh4M8zj5RwlpgYDRn5uTymx4iLPyw/pubhtml#'
        }

      ]
    },
    {
      name: 'General Progression',
      links: [
        {
          name: 'Links & Legion by Scardor',
          url: 'https://docs.google.com/spreadsheets/u/0/d/1h6dNf2fnl24b_qgSwanTTqGdXQ4K-SM8BYUpWdCpjDY/htmlview'
        },
        {
          name: 'General Progression Milestones by Scardor',
          url: 'https://bit.ly/RebootGameStages'
        },
        {
          name: 'Inner Abilities by Scarador',
          url: 'https://bit.ly/GMSBiS'
        },
        {
          name: 'Drop Gear Summary by /u/maplethrowaway2',
          url: 'https://www.reddit.com/r/Maplestory/comments/inizv7/updated_drop_rate_stacking_summary/'
        },
        {
          name: 'Legion 1-200 guide by /u/MapleDanny24',
          url: 'https://www.reddit.com/r/Maplestory/comments/dfny0a/reboot_a_speedy_nonexhausting_level_210_legion/'
        }
      ]
    },
    {
      name: 'Quest Guides',
      links: [
        {
          name: 'Esfera Guardian (Esfera Weekly) by /u/CalligrapherQuiet586',
          url: 'https://preview.redd.it/7cfl8wyemec81.png?width=790&format=png&auto=webp&s=e71bf03dcda105832edf7a71420ecf97e7a667c3'
        },
        {
          name: 'Tower of Oz Video Walkthrough by Perhapsody',
          url: 'https://www.youtube.com/watch?v=G_Qn0AcokhM'
        },
        {
          name: 'Tower of Oz Helper',
          url: 'https://mapleutils.com/en/seed/22'
        },
        {
          name: 'Scrapyard - Recommended Quests to Skip',
          url: 'https://strategywiki.org/wiki/MapleStory/Towns/Scrapyard#Overall_Recommendations'
        },
        {
          name: 'Afterlands Guide by /u/Foolyz',
          url: 'https://www.reddit.com/r/Maplestory/comments/8fgfty/afterlands_guide_fastest_way_possible_no_bugs/'
        },
        {
          name: 'Krrr Ring (Stellar Detectives) by /u/redbuffismine',
          url: 'https://www.reddit.com/r/MapleSEA/comments/jbhq03/stellar_detectives_guide_getting_krrrrawr_rings/'
        },
        {
          name: 'Mushroom Shrine Tales (Threads of Fate) by Minastory',
          url: 'https://www.youtube.com/watch?v=GgS5RKLUqTc'
        },
        {
          name: 'Threads of Fate Gifts by /u/thegreatestkatzby',
          url: 'https://www.reddit.com/r/Maplestory/comments/mu71mu/comment/gv41whl/'
        }
      ]
    },
    {
      name: 'NX Preview',
      links: [
        {
          name: 'Maples.im',
          url: 'https://maples.im/'
        },
        {
          name: 'Maplestory Studio',
          url: 'https://maplestory.studio/'
        }
      ]
    },
    {
      name: 'Other',
      links: [
        {
          name: 'Channel Status Checker',
          url: 'https://maple.690420.xyz/#GMS-Reboot'
        }
      ]
    }
  ]

  return (
    <div className="dropdown">
      <button className="btn btn-circle text-xl bg-base-300">
        <FaBars className="w-max"/>
      </button>
      <ul tabIndex={0} className="mt-3 p-2 menu menu-sm disabled dropdown-content rounded-box min-w-36 bg-base-300 z-[100]">{
        links.map((externalLinkGroup) => {
          return (<>
            {
                  (<li key={externalLinkGroup.name} className="text-m font-bold ml-2 mt-2 mb-1">
                      {externalLinkGroup.name}
                  </li>)
            }
            {
              externalLinkGroup.links.map((externalLink) => {
                  return (
                  <li key={externalLink.name} className='ml-4'>
                      <a className="link" href={externalLink.url} target="_blank" rel="noreferrer noopener">
                      {externalLink.name}
                      </a>
                  </li>)
              })
            }
          </>)
        })
      }</ul>
    </div>
  )
}
