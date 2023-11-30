import { DetailedHTMLProps, FC, HTMLAttributes } from "react"

import { ReactComponent as BellSmIcon } from "/assets/svgo/icons/bell-sm.svg"
import { ReactComponent as BellIcon } from "/assets/svgo/icons/bell.svg"
import { ReactComponent as BrukerIcon } from "/assets/svgo/icons/bruker.svg"
import { ReactComponent as ChartIcon } from "/assets/svgo/icons/chart.svg"
import { ReactComponent as DelIcon } from "/assets/svgo/icons/del.svg"
import { ReactComponent as FacebookIcon } from "/assets/svgo/icons/facebook.svg"
import { ReactComponent as GithubIcon } from "/assets/svgo/icons/github.svg"
import { ReactComponent as HusIcon } from "/assets/svgo/icons/hus.svg"
import { ReactComponent as InfoIcon } from "/assets/svgo/icons/info.svg"
import { ReactComponent as InstaIcon } from "/assets/svgo/icons/insta.svg"
import { ReactComponent as KnowitIcon } from "/assets/svgo/icons/knowit.svg"
import { ReactComponent as LastOppIcon } from "/assets/svgo/icons/last opp.svg"
import { ReactComponent as LenkeIcon } from "/assets/svgo/icons/lenke.svg"
import { ReactComponent as LoggInnIcon } from "/assets/svgo/icons/logg inn.svg"
import { ReactComponent as LoggUtIcon } from "/assets/svgo/icons/logg ut.svg"
import { ReactComponent as LukkIcon } from "/assets/svgo/icons/lukk.svg"
import { ReactComponent as MailIcon } from "/assets/svgo/icons/mail.svg"
import { ReactComponent as MenyIcon } from "/assets/svgo/icons/meny.svg"
import { ReactComponent as MuteIcon } from "/assets/svgo/icons/mute.svg"
import { ReactComponent as PersonIcon } from "/assets/svgo/icons/person.svg"
import { ReactComponent as PilIcon } from "/assets/svgo/icons/pil.svg"
import { ReactComponent as PremieIcon } from "/assets/svgo/icons/premie.svg"
import { ReactComponent as RedigerIcon } from "/assets/svgo/icons/rediger.svg"
import { ReactComponent as SendIcon } from "/assets/svgo/icons/send.svg"
import { ReactComponent as SoundIcon } from "/assets/svgo/icons/sound.svg"
import { ReactComponent as TwitterIcon } from "/assets/svgo/icons/twitter.svg"
import { ReactComponent as HeartIcon } from "/assets/svgo/icons/heart.svg"

import { cl } from "../../utils"

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
  upload: LastOppIcon,
  knowit: KnowitIcon,
  link: LenkeIcon,
  "sign-in": LoggInnIcon,
  "sign-out": LoggUtIcon,
  close: LukkIcon,
  mail: MailIcon,
  menu: MenyIcon,
  mute: MuteIcon,
  person: PersonIcon,
  arrow: PilIcon,
  award: PremieIcon,
  edit: RedigerIcon,
  sound: SoundIcon,
  twitter: TwitterIcon,
  send: SendIcon,
  heart: HeartIcon
}

export type IconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  sm?: boolean
  name: keyof typeof ICONS
  className?: string
}

const Icon: FC<IconProps> = ({ sm = false, name, className, ...rest }) => {
  const IconComponent = ICONS[name]

  return (
    <i
      className={cl(
        `
          relative
          inline-block

          h-[1.575rem]
          w-[1.575rem]
          align-middle

          child:-left-1
          child:-top-1
        `,
        sm && "h-[1.35rem] w-[1.35rem] child:left-[.5px] child:top-[.5px]",
        className
      )}
      {...rest}
    >
      <IconComponent className="absolute h-full w-full" />
    </i>
  )
}

export default Icon
