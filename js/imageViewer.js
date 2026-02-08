// Section 3.3 ImageViewer Module
const ImageViewer = {
    getImagePath: (triangleType, isRightTriangle) => {
        const ASSET_PATH = "assets/";

        if (isRightTriangle) {
            return `${ASSET_PATH}right.svg`;
        }

        // Map types to filenames
        switch (triangleType) {
            case "Equilateral":
                return `${ASSET_PATH}equilateral.svg`;
            case "Isosceles":
                return `${ASSET_PATH}isosceles.svg`;
            case "Scalene":
                return `${ASSET_PATH}scalene.svg`;
            default:
                return "";
        }
    }
};
