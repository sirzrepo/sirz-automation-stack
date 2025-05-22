export interface IserviceCardProps {
    title: string,
    description?: string,
    linkText?: string,
    image?: string,
    url?: string | null,
    className?: string
}

export interface IexploreTemplateProps {
    header?: string,
    description?: string,
    linkText?: string,
    image?: string,
    className?: string
}

export interface IauthCardProps {
    header?: string,
    subheader?: string,
    description?: string,
    linkText?: string,
    linkUrl?: string,
    image?: string,
    listItems?: string[],
    className?: string
}

export interface IsimpleCardProps {
    description: string,
    image: string,
    className?: string
}

export interface IquestionCardProps {
    description?: string,
    subdescription?: string,
    image?: string,
    className?: string
}

export interface IhumanTemplateProps {
    header?: string,
    description?: string,
    linkText?: string,
    image?: string,
    className?: string
}

export interface Idata {
    title?: string,
    description?: string,
    inverted?: boolean,
    className?: string,
}