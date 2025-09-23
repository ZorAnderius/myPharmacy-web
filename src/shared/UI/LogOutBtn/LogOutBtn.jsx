import Button from "../Button/Button";

const LogOutBtn = ({ className = '' }) => {
  return <Button className={className ? `${className}-logout` : "logout"}>Log Out</Button>;
};

export default LogOutBtn;
