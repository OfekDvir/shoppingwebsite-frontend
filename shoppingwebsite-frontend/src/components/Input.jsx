

const Input = ({ labelText, id, type, placeholder, value, handleChange }) => {

    return (
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input type={type} name={id} id={id} placeholder={placeholder} value={value} onChange={handleChange} required />
        </div>
    )
}

export default Input;



