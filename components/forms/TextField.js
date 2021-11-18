import { useState } from 'react';
import classes from './CustomInputs.module.scss';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const TextField = ({
  type,
  register,
  error,
  inputwidth,
  inputheight,
  label,
  name,
  placeholder,
  defaultValue,
  mandatory,
  step,
}) => {
  const [showPassword, setShowPassword] = useState(type);

  const seePassword = () => setShowPassword(() => 'text');

  const hidePassword = () => setShowPassword(() => 'password');

  return (
    <div>
      <input
        {...register(name, { required: mandatory === true ? true : false })}
        className={classes.input}
        style={{ width: inputwidth, height: inputheight }}
        type={showPassword}
        id={name}
        // name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ? defaultValue : ''}
        step={step}
        min={0}
      />
      

      <label  className={classes.label}>
        {label}
        {type === 'password' && (
        <div className={classes.icon}>
          {showPassword === 'password' ? (
            <BsEyeFill onClick={seePassword} />
          ) : (
            <BsEyeSlashFill onClick={hidePassword} />
          )}
        </div>
      )}
      </label>

      {/* {error[name] ? (
        <div className={classes.error}>{label} is required</div>
      ) : (
        <div className={classes.error}>{""}</div>
      )} */}
    </div>
  );
};

export default TextField;
