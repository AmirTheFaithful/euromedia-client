import { useState, useEffect } from "react";

import type { LoginData } from "../types";
import { emailRegex } from "@/utils/validators";

export const useLoginValidation = (data: LoginData) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const isValid = emailRegex.test(data.email) && data.password.length >= 8;
    setValid(isValid);
  }, [data]);

  return valid;
};
