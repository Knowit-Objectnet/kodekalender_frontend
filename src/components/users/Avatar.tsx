import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

import avatarFallback from "/assets/svgo/slettet.svg"

import { cl } from "../../utils"


type AvatarProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  avatar?: string
  deleted?: boolean
}

export const Avatar = ({ avatar, deleted, className, ...rest }: AvatarProps) => (
  <img
    className={cl(
      "w-24 max-w-24 h-24 max-h-24 object-cover flex items-center justify-center rounded-full",
      className
    )}
    src={(deleted || !avatar) ? avatarFallback : avatar}
    alt=""
    loading="lazy"
    {...rest}
  />
)
