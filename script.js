
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    // container.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function splitPartition(direction, button) {
    const partition = button.closest('.partition');
    const parent = partition.parentElement;
    const isHorizontal = direction === 'H';

    // Create new partitions
    const newPartition1 = document.createElement('div');
    const newPartition2 = document.createElement('div');

    newPartition1.className = 'partition resizable';
    newPartition2.className = 'partition resizable';

    // Apply random color to one of the new partitions
    newPartition2.style.backgroundColor = getRandomColor();

    // Set up controls
    const controls1 = createControls();
    const controls2 = createControls();
    newPartition1.appendChild(controls1);
    newPartition2.appendChild(controls2);

    // Replace original partition with the new structure
    partition.innerHTML = '';
    partition.appendChild(newPartition1);
    partition.appendChild(newPartition2);

    if (isHorizontal) {
        partition.style.flexDirection = 'row';
    } else {
        partition.style.flexDirection = 'column';
    }

    partition.appendChild(newPartition1);
    partition.appendChild(newPartition2);

    // Set flex basis for resizable behavior
    newPartition1.style.flexBasis = '50%';
    newPartition2.style.flexBasis = '50%';
}

function createControls() {
    const controls = document.createElement('div');
    controls.className = 'controls';

    const vButton = document.createElement('button');
    vButton.className = 'split-btn';
    vButton.innerText = 'V';
    vButton.onclick = () => splitPartition('V', vButton);

    const hButton = document.createElement('button');
    hButton.className = 'split-btn';
    hButton.innerText = 'H';
    hButton.onclick = () => splitPartition('H', hButton);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.innerText = '-';
    removeButton.onclick = () => removePartition(removeButton);

    controls.appendChild(vButton);
    controls.appendChild(hButton);
    controls.appendChild(removeButton);

    return controls;
}

function removePartition(button) {
    const partition = button.closest('.partition');
    const parent = partition.parentElement;

    if (parent && parent.classList.contains('partition')) {
        parent.innerHTML = '';
        parent.classList.add('resizable');
        const controls = createControls();
        parent.appendChild(controls);
        parent.style.backgroundColor = getRandomColor();
    }
}
