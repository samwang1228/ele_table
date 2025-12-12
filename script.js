// Link input IDs to Preview IDs
const bindings = [
    'clientName', 'year', 'month', 'day',
    'startHour', 'startMin', 'endHour', 'endMin', 'totalHour', 'totalMin',
    'carNumber', 'driver',
    'baseCost', 'overtimeCost', 'totalCost'
];

// Special handling for content that needs processing
const specialBindings = {
    'itinerary': (val) => val, // Textarea preserves newlines via CSS
};

const checkboxes = ['checkImport', 'checkDomestic', 'checkSeat'];

function updatePreview() {
    // Standard Text Inputs
    bindings.forEach(id => {
        const input = document.getElementById(id);
        const preview = document.getElementById(`preview-${id}`);
        if (input && preview) {
            preview.textContent = input.value;
        }
    });

    // Textarea
    const itineraryInput = document.getElementById('itinerary');
    const itineraryPreview = document.getElementById('preview-itinerary');
    if (itineraryInput && itineraryPreview) {
        itineraryPreview.textContent = itineraryInput.value;
    }

    // Checkboxes
    checkboxes.forEach(id => {
        const input = document.getElementById(id);
        const preview = document.getElementById(`preview-${id}`);
        if (input && preview) {
            // Use unicode characters instead of CSS styling for reliable rendering
            preview.textContent = input.checked ? '☑' : '☐';
            // Ensure font size and alignment matches text
            preview.style.fontSize = '1.2em';
            // Reset excessive scaling if previously applied, or keep generic styling
        }
    });
}

// Attach Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });

    // Initial update
    updatePreview();
});

function generateImage() {
    const btn = document.querySelector('button[onclick="generateImage()"]');
    const originalText = btn.innerHTML;

    // 1. Visual Feedback
    btn.innerHTML = '<span>⏳ 處理中...</span>';
    btn.disabled = true;

    // 2. Library Check
    if (typeof html2canvas === 'undefined') {
        alert('錯誤：無法載入圖片生成工具 (html2canvas)。\n請檢查您的網路連線，或嘗試使用截圖功能。');
        btn.innerHTML = originalText;
        btn.disabled = false;
        return;
    }

    const element = document.getElementById('capture-area');

    // 3. Execution
    html2canvas(element, {
        scale: 2, // High resolution
        backgroundColor: null,
        useCORS: true,
        logging: true, // Enable logs for debugging
    }).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.download = `租車簽認單_${document.getElementById('clientName').value || '未命名'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }).catch(err => {
        console.error('Image generation failed:', err);
        alert('圖片生成失敗，可能的安全限制。\n建議直接使用電腦的截圖工具 (Win+Shift+S)。\n錯誤訊息: ' + err.message);

        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}
