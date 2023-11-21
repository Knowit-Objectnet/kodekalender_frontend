import { FC } from "react"

import LeaderBoardContent from "../components/LeaderboardContent"
import { Header1 } from "../components/text"

import Page from "./Page"


const Leaderboard: FC = () => (
  <Page className="pt-24 pb-16 px-16 mx-8 overflow-y-hidden bg-purple-700 rounded-md text-center">
    <Header1>Snille barn</Header1>
    <div className="h-[calc(100vh-20.5rem)] overflow-y-auto">
      <LeaderBoardContent />
    </div>
  </Page>
)

export default Leaderboard
