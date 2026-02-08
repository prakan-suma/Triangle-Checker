const fs = require('fs');
const path = require('path');

try {
    const validatorPath = path.join(__dirname, 'js', 'validator.js');
    console.log(`Loading Validator from ${validatorPath}`);
    let validatorContent = fs.readFileSync(validatorPath, 'utf8');

    // Append module.exports
    validatorContent += '\nmodule.exports = Validator;';

    const tempPath = path.join(__dirname, 'temp_validator.js');
    fs.writeFileSync(tempPath, validatorContent);

    const Validator = require('./temp_validator.js');

    // Clean up
    fs.unlinkSync(tempPath);

    const testCases = [
        { s1: 3, s2: 4, s3: 5, expectedValid: true, desc: "Right Scalene (3,4,5)" },
        { s1: 5, s2: 5, s3: 5, expectedValid: true, desc: "Equilateral (5,5,5)" },
        { s1: 1, s2: 2, s3: 3, expectedValid: false, expectedMsg: "Impossible.", desc: "Degenerate (1,2,3)" },
        { s1: 1, s2: 2, s3: 10, expectedValid: false, expectedMsg: "Impossible.", desc: "Impossible (1,2,10)" },
        { s1: 0, s2: 5, s3: 5, expectedValid: false, expectedMsg: "Invalid input and Impossible.", desc: "Invalid (0,5,5)" },
        { s1: -1, s2: 2, s3: 10, expectedValid: false, expectedMsg: "Invalid input and Impossible.", desc: "Invalid & Impossible (-1,2,10)" }
    ];

    let failed = false;

    testCases.forEach(tc => {
        const result = Validator.validate(tc.s1, tc.s2, tc.s3);
        let passed = result.isValid === tc.expectedValid;
        if (tc.expectedMsg && result.errorMessage !== tc.expectedMsg) {
            passed = false;
        }

        if (passed) {
            console.log(`[PASS] ${tc.desc}`);
        } else {
            console.error(`[FAIL] ${tc.desc}`);
            console.error(`  Expected: isValid=${tc.expectedValid}, msg="${tc.expectedMsg || ''}"`);
            console.error(`  Actual:   isValid=${result.isValid}, msg="${result.errorMessage}"`);
            failed = true;
        }
    });

    if (failed) process.exit(1);
    console.log("All tests passed!");

} catch (e) {
    console.error("Error running tests:", e);
    process.exit(1);
}
