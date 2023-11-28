import { FC } from "react"

import LeaderBoardContent from "../components/LeaderboardContent"
import { Header1 } from "../components/text"

import Page from "./Page"

const Leaderboard: FC = () => (
  <Page className="mx-8 overflow-y-hidden rounded-md bg-purple-700 px-16 pb-16 pt-24 text-center">
    <Header1>Snille barn</Header1>
    <div className="h-[calc(100vh-20.5rem)] overflow-y-auto">
      <LeaderBoardContent />
    </div>
  </Page>
)

export default Leaderboard
