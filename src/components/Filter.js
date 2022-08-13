const Filter = ({ onChange, value }) => (
    <section>
        Filter Names: <input onChange={onChange} value={value} />
    </section>
);
export default Filter;
