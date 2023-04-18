export const TextAreaField = ({ label, value, setValue }) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor="value">{ label }</label>
            <textarea id="value" name="value"
                className="form-control"
                value={value}
                // row="6"
                onChange={event => setValue(event.target.value)} />
        </div>
    </>
}