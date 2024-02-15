import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useDarkModeContext } from "../context/DarkModeContext";

import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  const { isDarkMode, handleToggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon onClick={handleToggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
