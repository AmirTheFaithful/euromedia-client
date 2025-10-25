import { useState, useEffect } from "react";

import { RegisterData } from "../types";
import { emailRegex } from "@/utils/validators";

export const useRegisterValidation = (data: RegisterData) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const isValid =
      data.firstname.length > 2 &&
      data.firstname.length < 50 &&
      data.lastname.length > 2 &&
      data.lastname.length < 50 &&
      emailRegex.test(data.email) &&
      data.password.length >= 8;
    setValid(isValid);
  }, [data]);

  return valid;
};
