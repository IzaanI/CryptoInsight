
function InputField({ label, className = 'defaultCredential', value, onChange, onFocus, onBlur }) {
  return (
    <>
      <input
        className={className}
        onFocus ={onFocus}
        onBlur= {onBlur}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default InputField
