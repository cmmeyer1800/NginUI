
const IconText = (props) => {
    return (
        <span class="icon-text">
            <span class="icon">
                {props.icon}
            </span>
            <span>{props.children}</span>
        </span>
    )
}

export {IconText};