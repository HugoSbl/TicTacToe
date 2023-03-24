import type { UseUserNamesFormReturnType } from "~/type/TypeTicTacToe";
import useGame from "~/hooks/useGame";
import type React from "react";
import { useRef } from "react";
import toast from "react-hot-toast";

const useUserNamesForm = (): UseUserNamesFormReturnType => {
  const { setUserNames } = useGame();
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;
    if (!userX || !userO) {
      toast.error("Please enter your usernames");
      return;
    }
    if (userX.length > 10 || userO.length > 10) {
      toast.error("10 characters maximum");
      return;
    }
    if (userX === userO) {
      toast.error("Please enter two unique usernames");
      return;
    }

    toast.success(`Player X : ${userX}\n Player O : ${userO}`);
    setUserNames({ X: userX, O: userO });
  };

  return {
    userXRef,
    userORef,
    onSubmit,
  };
};

export default useUserNamesForm;
