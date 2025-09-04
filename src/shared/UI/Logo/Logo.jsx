import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { ROUTES } from "../../../constants/routes";
import clsx from "clsx";
import Icon from "../Icon/Icon";

const Logo = ({ location }) => {
  return (
    <Link
      to={ROUTES.MAIN}
      className={clsx(
        styles["logo-container"],
        location ? styles["logo-home"] : styles["logo"]
      )}
      >
          <Icon name="pharmacy" size={32} />
          <p>myPharmacy</p>
    </Link>
  );
};

export default Logo;
