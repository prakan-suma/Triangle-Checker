// Section 4.1 Main Controller Logic
document.addEventListener('DOMContentLoaded', () => {
    const side1Input = document.getElementById('side1');
    const side2Input = document.getElementById('side2');
    const side3Input = document.getElementById('side3');
    const calculateBtn = document.getElementById('calculateBtn');

    const resultContainer = document.getElementById('resultContainer');
    const resultTitle = document.getElementById('resultTitle');
    const resultImage = document.getElementById('resultImage');

    const errorContainer = document.getElementById('errorContainer');
    const errorMessage = document.getElementById('errorMessage');

    calculateBtn.addEventListener('click', () => {
        // Reset UI
        resultContainer.classList.add('hidden');
        resultContainer.classList.remove('opacity-100');
        errorContainer.classList.add('hidden');

        const s1 = parseFloat(side1Input.value);
        const s2 = parseFloat(side2Input.value);
        const s3 = parseFloat(side3Input.value);

        // Section 3.1 Validator Module
        const validationResult = Validator.validate(s1, s2, s3);

        if (!validationResult.isValid) {
            showError(validationResult.errorMessage);
            return;
        }

        // Section 3.2 Classifier Module
        const classificationResult = Classifier.classify(s1, s2, s3);

        // Section 3.3 ImageViewer Module
        const imagePath = ImageViewer.getImagePath(classificationResult.triangleType, classificationResult.isRightTriangle);

        showResult(classificationResult.triangleType, classificationResult.isRightTriangle, imagePath);
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorContainer.classList.remove('hidden');
    }

    function showResult(type, isRight, imagePath) {
        let displayText = type;
        if (isRight) {
            displayText += " (Right Triangle)";
        }

        resultTitle.textContent = displayText;
        resultImage.src = imagePath;

        resultContainer.classList.remove('hidden');
        setTimeout(() => {
            resultContainer.classList.add('opacity-100');
        }, 10);
    }
});
