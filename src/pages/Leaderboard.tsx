import { FC } from "react"

import LeaderBoardContent from "../components/LeaderboardContent"
import Header1 from "../components/text/Header1"

import Page from "./Page"


const Leaderboard: FC = () => (
  <Page className="pt-12 pb-8 px-8 mx-4 overflow-y-hidden bg-purple-700 rounded-md text-center">
    <Header1>Snille barn</Header1>
    <div className="h-[calc(100vh-20.5rem)] overflow-y-auto">
      <LeaderBoardContent />
    </div>
  </Page>
)

export default Leaderboard
