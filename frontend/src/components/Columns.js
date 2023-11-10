

const Columns = (props) => {

    const multiLine = (props.isMultiline !== undefined) ? "is-multiline": "";

    return (
        <div className={`columns ${multiLine}`}>
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