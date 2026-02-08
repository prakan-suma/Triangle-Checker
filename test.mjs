import { Validator } from './js/validator.js';
import { Classifier } from './js/classifier.js';
import { ImageViewer } from './js/imageViewer.js';

function runTests() {
    console.log("Starting Verification...\n");
    let passed = 0;
    let failed = 0;

    // Helper to log result
    function assert(testName, condition, message) {
        if (condition) {
            console.log(`[PASS] ${testName}`);
            passed++;
        } else {
            console.error(`[FAIL] ${testName}: ${message}`);
            failed++;
        }
    }

    // TC-01: Invalid Input (0, 5, 5)
    {
        const s1 = 0, s2 = 5, s3 = 5;
        const val = Validator.validate(s1, s2, s3);
        const expectedMsg = "Invalid input, please insert a number above 0.";
        assert("TC-01 (Validator)",
            !val.isValid && val.errorMessage === expectedMsg,
            `Expected invalid with msg '${expectedMsg}', got isValid=${val.isValid}, msg='${val.errorMessage}'`
        );
    }

    // TC-02: Impossible Triangle (2, 3, 10)
    {
        const s1 = 2, s2 = 3, s3 = 10;
        const val = Validator.validate(s1, s2, s3);
        const expectedMsg = "Impossible.";
        assert("TC-02 (Validator)",
            !val.isValid && val.errorMessage === expectedMsg,
            `Expected impossible with msg '${expectedMsg}', got isValid=${val.isValid}, msg='${val.errorMessage}'`
        );
    }

    // TC-03: Invalid & Impossible (-1, 2, 10)
    {
        const s1 = -1, s2 = 2, s3 = 10;
        const val = Validator.validate(s1, s2, s3);
        const expectedMsg = "Invalid input and Impossible.";
        assert("TC-03 (Validator)",
            !val.isValid && val.errorMessage === expectedMsg,
            `Expected Both with msg '${expectedMsg}', got isValid=${val.isValid}, msg='${val.errorMessage}'`
        );
    }

    // TC-04: Right Triangle (3, 4, 5) -> Scalene Right
    {
        const s1 = 3, s2 = 4, s3 = 5;
        const val = Validator.validate(s1, s2, s3);
        assert("TC-04 (Validator)", val.isValid, "Should be valid");

        if (val.isValid) {
            const classRes = Classifier.classify(s1, s2, s3);
            assert("TC-04 (Classifier Type)", classRes.triangleType === "Scalene", `Expected Scalene, got ${classRes.triangleType}`);
            assert("TC-04 (Classifier Right)", classRes.isRightTriangle === true, "Expected Right Triangle");

            const imgPath = ImageViewer.getImagePath(classRes.triangleType, classRes.isRightTriangle);
            assert("TC-04 (ImageViewer)", imgPath.includes("right.svg"), `Expected right.svg, got ${imgPath}`);
        }
    }

    // TC-05: Equilateral (5, 5, 5)
    {
        const s1 = 5, s2 = 5, s3 = 5;
        const val = Validator.validate(s1, s2, s3);
        assert("TC-05 (Validator)", val.isValid, "Should be valid");

        if (val.isValid) {
            const classRes = Classifier.classify(s1, s2, s3);
            assert("TC-05 (Classifier Type)", classRes.triangleType === "Equilateral", `Expected Equilateral, got ${classRes.triangleType}`);

            const imgPath = ImageViewer.getImagePath(classRes.triangleType, classRes.isRightTriangle);
            assert("TC-05 (ImageViewer)", imgPath.includes("equilateral.svg"), `Expected equilateral.svg, got ${imgPath}`);
        }
    }

    console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed.`);
}

runTests();
