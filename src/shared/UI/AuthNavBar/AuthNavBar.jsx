import styles from './AuthNavBar,module.css';

const AuthNavBar = ({location}) => {
  const prefix = location ? "-home" : "";
  return (
    <ul className={clsx(styles["auth-nav"], location && styles["home"])}>
      <li>
        <LinkBtn type={`login${prefix}`} direction={ROUTES.LOGIN}>
          Log In
        </LinkBtn>
      </li>
      <li>
        <LinkBtn type="register" direction={ROUTES.REGISTER}>
          Registration
        </LinkBtn>
      </li>
    </ul>
  );
}

export default AuthNavBar