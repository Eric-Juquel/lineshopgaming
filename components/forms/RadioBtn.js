import classes from './CustomInputs.module.scss';

const RadioBtn = ({
  register,
  label,
  name,
  value,
  checked,
  disabled,
  message,
}) => {
  return (
    <div className={classes.radio}>
      <input
        {...register(name)}
        type="radio"
        className={classes.input}
        id={label}
        name={name}
        value={value}
        defaultChecked={checked}
        disabled={disabled}
      />
      <label htmlFor={label} className={classes.label}>
        <span className={classes.radioButton}></span>
        <h6>{label}</h6>
        <p>{message}</p>
      </label>
    </div>
  );
};

export default RadioBtn;
