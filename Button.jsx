function Button({label, onClick, className ='defaultButton'}){
    return(
        <button onClick = {onClick} className = {className}>
            {label}
        </button>
    )
}

export default Button