export const TextField = ({ label, value, setValue }) => {
    return <>
        <div className="form-group mb-3">
            <label htmlFor="value">{ label }</label>
            <input id="value" name="value"
                className="form-control"
                type="text"
                value={value}
                rows={6}
                onChange={event => setValue(event.target.value)} />
        </div>
    </>
}