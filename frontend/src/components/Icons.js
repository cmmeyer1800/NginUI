
const IconText = (props) => {
    return (
        <span className="icon-text">
            <span className="icon">
                {props.icon}
            </span>
            <span>{props.children}</span>
        </span>
    )
}

const IconTextRight = (props) => {
    return (
        <span className="icon-text">
            <span>{props.children}</span>
            <span className="icon">
                {props.icon}
            </span>
        </span>
    )
}

const Icon = (props) => {
    return (
        <span className="icon">
            {props.icon}
        </span>
    )
}

export {IconText, IconTextRight, Icon};