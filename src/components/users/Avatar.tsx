import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

import avatarFallback from "/assets/svgo/misc/slettet.svg"

import { cl } from "../../utils"

type AvatarProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  avatar?: string
  deleted?: boolean
}

export const Avatar = ({ avatar, deleted, className, ...rest }: AvatarProps) => (
  <img
    className={cl(
      "flex h-24 max-h-24 w-24 max-w-24 items-center justify-center rounded-full object-cover",
      className
    )}
    src={deleted || !avatar ? avatarFallback : avatar}
    alt=""
    loading="lazy"
    {...rest}
  />
)
