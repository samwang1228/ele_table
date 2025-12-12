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
            if (input.checked) {
                preview.classList.add('checked');
            } else {
                preview.classList.remove('checked');
            }
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
    const element = document.getElementById('capture-area');

    // Use html2canvas
    html2canvas(element, {
        scale: 2, // High resolution
        backgroundColor: null,
        useCORS: true
    }).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.download = `租車簽認單_${document.getElementById('clientName').value || '未命名'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
