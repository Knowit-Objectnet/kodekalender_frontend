import clsx, { ClassValue } from "clsx"
import { FC } from "react"

import { ReactComponent as BellIcon } from "../../../assets/svg/icons/bell.svg"
import { ReactComponent as BellSmIcon } from "../../../assets/svg/icons/bell-sm.svg"
import { ReactComponent as BrukerIcon } from "../../../assets/svg/icons/bruker.svg"
import { ReactComponent as ChartIcon } from "../../../assets/svg/icons/chart.svg"
import { ReactComponent as DelIcon } from "../../../assets/svg/icons/del.svg"
import { ReactComponent as FacebookIcon } from "../../../assets/svg/icons/facebook.svg"
import { ReactComponent as GithubIcon } from "../../../assets/svg/icons/github.svg"
import { ReactComponent as HusIcon } from "../../../assets/svg/icons/hus.svg"
import { ReactComponent as InfoIcon } from "../../../assets/svg/icons/info.svg"
import { ReactComponent as InstaIcon } from "../../../assets/svg/icons/insta.svg"
import { ReactComponent as KnowitLogoIcon } from "../../../assets/svg/icons/Knowit logo.svg"
import { ReactComponent as LastOppIcon } from "../../../assets/svg/icons/last opp.svg"
import { ReactComponent as LenkeIcon } from "../../../assets/svg/icons/lenke.svg"
import { ReactComponent as LoggInnIcon } from "../../../assets/svg/icons/logg inn.svg"
import { ReactComponent as LukkIcon } from "../../../assets/svg/icons/lukk.svg"
import { ReactComponent as MailIcon } from "../../../assets/svg/icons/mail.svg"
import { ReactComponent as MenyIcon } from "../../../assets/svg/icons/meny.svg"
import { ReactComponent as MuteIcon } from "../../../assets/svg/icons/mute.svg"
import { ReactComponent as PersonIcon } from "../../../assets/svg/icons/person.svg"
import { ReactComponent as PilIcon } from "../../../assets/svg/icons/pil.svg"
import { ReactComponent as PremieIcon } from "../../../assets/svg/icons/premie.svg"
import { ReactComponent as RedigerIcon } from "../../../assets/svg/icons/rediger.svg"
import { ReactComponent as SoundIcon } from "../../../assets/svg/icons/sound.svg"
import { ReactComponent as TwitterIcon } from "../../../assets/svg/icons/twitter.svg"


const ICONS = {
  bell: BellIcon,
  "bell-sm": BellSmIcon,
  user: BrukerIcon,
  chart: ChartIcon,
  share: DelIcon,
  facebook: FacebookIcon,
  github: GithubIcon,
  house: HusIcon,
  info: InfoIcon,
  instagram: InstaIcon,
  "knowit-logo": KnowitLogoIcon,
  upload: LastOppIcon,
  link: LenkeIcon,
  signin: LoggInnIcon,
  close: LukkIcon,
  mail: MailIcon,
  menu: MenyIcon,
  mute: MuteIcon,
  person: PersonIcon,
  arrow: PilIcon,
  award: PremieIcon,
  edit: RedigerIcon,
  sound: SoundIcon,
  twitter: TwitterIcon
}

export type IconProps = {
  name: keyof typeof ICONS
  className?: ClassValue
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = ICONS[name]

  return (
    <i
      className={clsx(
        `
          inline-block
          align-middle

          w-16
          h-16

          child:w-full
          child:h-full
        `,
        className
      )}
    >
      <IconComponent />
    </i>
  )
}

export default Icon
