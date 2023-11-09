

const Columns = (props) => {
    return (
        <div className="columns">
            {props.children}
        </div>
    )
}

const Column = (props) => {

    const widthParam = (props.width !== undefined) ? `is-${props.width}` : ""
    const isNarrow = (props.isNarrow !== undefined) ? 'is-narrow' : ""

    return (
        <div className={`column ${widthParam} ${isNarrow}`}>
            {props.children}
        </div>
    )
}

export {Column, Columns};