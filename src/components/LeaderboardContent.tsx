import { FC, ReactElement, ReactNode, useMemo } from "react"
import { isEmpty, isNil, map, reduce, upperFirst } from "lodash-es"

import { cl, getObjKey, getRandomDisplayName, numberString } from "../utils"
import { useLeaderboard } from "../api/requests"
import { useWhoami } from "../api/users/requests"

import { Header4 } from "./text"
import Divider from "./Divider"

type LeaderboardGroup = [
  number,
  Array<{
    uuid: string
    username: string | null
    avatar_url: string
    position: number
  }>
]
type LeaderboardWithPosition = Array<LeaderboardGroup>

type LeaderBoardContentProps = {
  CloseButton?: ReactElement
}

const dummydata: LeaderboardWithPosition = [
  [
    1,
    [
      {
        uuid: "1",
        username: "Jhonny Bever",
        avatar_url:
          "https://i.pinimg.com/280x280_RS/2a/2d/a1/2a2da113aa9d2f9a077cba416fc89f50.jpg",
        position: 1
      },
      {
        uuid: "2",
        username: "Bumi Baluba",
        avatar_url:
          "https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/1720/avatar.png",
        position: 2
      },
      {
        uuid: "3",
        username: "Keksi Keksi",
        avatar_url: "https://avatars.githubusercontent.com/u/42798691?v=4",
        position: 3
      },
      {
        uuid: "4",
        username: "TehCrYpTz",
        avatar_url:
          "https://static.miraheze.org/thefinalrumblewiki/2/29/Runescape_bot.png",
        position: 4
      }
    ]
  ],
  [
    2,
    [
      {
        uuid: "1",
        username: "PlingPlong",
        avatar_url:
          "https://oldschool.runescape.wiki/images/thumb/Blue_partyhat_detail.png/1200px-Blue_partyhat_detail.png?c1867",
        position: 1
      },
      {
        uuid: "2",
        username: "Atle Antonsen",
        avatar_url:
          "https://akamai.vgc.no/v2/images/d237e9a1-a4bf-4c8b-9a18-10a0d69a1a46?fit=crop&format=auto&h=1069&w=1900&s=3d2febd9aa5580f61407332a0abab5da4aac1c84",
        position: 2
      },
      {
        uuid: "3",
        username: "Lord Amadeus",
        avatar_url:
          "https://g.acdn.no/obscura/API/dynamic/r1/nadp/tr_1000_2000_s_f/0000/2011/01/24/8109608/1/original/helter_576.jpg?chk=58EB7D",
        position: 3
      }
    ]
  ],
  [
    3,
    [
      {
        uuid: "1",
        username: "Knarkorama Pusen",
        avatar_url:
          "https://akamai.vgc.no/v2/images/ff31b1fb-5204-4262-b06e-03c0ff5480a1?fit=crop&format=auto&h=1297&w=1900&s=84e2bcdcc682466d6aade1a28dde4e50a432155c",
        position: 1
      }
    ]
  ],
  [
    4,
    [
      { uuid: "1", username: "Kry Er fint", avatar_url: "", position: 1 },
      {
        uuid: "2",
        username: "Jeg elsker kjeks",
        avatar_url: "",
        position: 2
      },
      {
        uuid: "3",
        username: "Gaute Grøtta Grav",
        avatar_url: "",
        position: 3
      },
      {
        uuid: "4",
        username: "Jnatten",
        avatar_url: "https://www.blakors.no/content/uploads/2019/12/FotoLeo-768x1024.jpeg",
        position: 4
      }
    ]
  ],
  [
    5,
    [
      { uuid: "1", username: "Leo Er Tært", avatar_url: "https://www.seminarpartner.no/wp-content/uploads/2018/02/Portrett-B%C3%A5rd.jpg", position: 1 },
      {
        uuid: "2",
        username: "Tyst og Julete",
        avatar_url: "https://images.squarespace-cdn.com/content/v1/54c7bfd3e4b0c3312da95fb3/1557582957654-D197L8OT0KBWZWQQ5L3T/profilbilde-personal-branding.jpeg?format=2500w",
        position: 2
      }
    ]
  ]
]

const LeaderBoardContent: FC<LeaderBoardContentProps> = () => {
  const { data: leaderboard } = useLeaderboard()

  const { data: whoami } = useWhoami()

  // Calculate overall position for each user, regardless of grouping.
  const leaderboardWithPosition = useMemo(() => {
    if (!leaderboard) return []

    return reduce(
      leaderboard,
      (list, [solvedCount, tuples]) => {
        const numPrecedingGroupedUsers = reduce(
          list,
          (sum, [_, entries]) => sum + entries.length,
          0
        )

        return [
          ...list,
          [
            solvedCount,
            map(tuples, ([uuid, username, avatar_url], i) => ({
              uuid,
              username,
              avatar_url,
              position: numPrecedingGroupedUsers + i + 1
            }))
          ] as LeaderboardGroup
        ]
      },
      [] as LeaderboardWithPosition
    )
  }, [leaderboard])

  if (isNil(leaderboard)) return null
  if (isEmpty(leaderboard))
    return (
      <div className="relative h-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Ingen snille barn!
        </div>
      </div>
    )

  return (
    <>
      {map(dummydata.reverse(), ([solvedCount, entries]) => (
        <div key={solvedCount}>
          <Header4
            className="sticky top-0 -space-y-2 rounded-md py-2 text-center"
            key={solvedCount}
          >
            <div className="text-lg font-semibold tracking-wide">
              {upperFirst(numberString(solvedCount))} løst
              {solvedCount > 1 && "e"}
            </div>
            <div className="text-sm text-gray/80">
              {numberString(entries.length, true)} snil
              {entries.length > 1 ? "le" : "t"} barn
            </div>
          </Header4>
          <Divider bgClasses="bg-purple-500 w-2/3" />
          <div className="flex flex-col justify-center gap-y-3 text-center">
            {map(entries, (user) => {
              let displayName: ReactNode = user.username
              if (!displayName) {
                const [name, emoji] = getRandomDisplayName(user.uuid)
                displayName = (
                  <span>
                    <em>{name}</em>&nbsp;{emoji}
                  </span>
                )
              }

              return (
                <p
                  key={getObjKey(user)}
                  className={cl(
                    whoami?.uuid === user.uuid &&
                      "w-2/3 rounded-md bg-purple-700"
                  )}
                >
                  <span className="tracking-wide text-gray">
                    {user.position}.
                  </span>
                  &nbsp;{displayName}
                </p>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}

export default LeaderBoardContent
