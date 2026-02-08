// Section 3.1 Validator Module
const Validator = {
    validate: (s1, s2, s3) => {
        let isInvalid = false;
        let isImpossible = false;

        if (isNaN(s1) || isNaN(s2) || isNaN(s3) || s1 <= 0 || s2 <= 0 || s3 <= 0) {
            isInvalid = true;
        }

        if ((s1 + s2 <= s3) || (s1 + s3 <= s2) || (s2 + s3 <= s1)) {
            isImpossible = true;
        }

        if (isInvalid && isImpossible) {
            return { isValid: false, errorMessage: "Invalid input and Impossible." };
        } else if (isInvalid) {
            return { isValid: false, errorMessage: "Invalid input, please insert a number above 0." };
        } else if (isImpossible) {
            return { isValid: false, errorMessage: "Impossible." };
        } else {
            return { isValid: true, errorMessage: "" };
        }
    }
};
