// Section 3.2 Classifier Module
const Classifier = {
    classify: (s1, s2, s3) => {
        let triangleType = "";
        let isRightTriangle = false;

        if (s1 === s2 && s2 === s3) {
            triangleType = "Equilateral";
        } else if (s1 === s2 || s1 === s3 || s2 === s3) {
            triangleType = "Isosceles";
        } else {
            triangleType = "Scalene";
        }

        const sides = [s1, s2, s3].sort((a, b) => a - b);
        const a = sides[0];
        const b = sides[1];
        const c = sides[2];

        if (Math.abs((a * a + b * b) - (c * c)) < 0.01) {
            isRightTriangle = true;
        }

        return {
            triangleType: triangleType,
            isRightTriangle: isRightTriangle
        };
    }
};
