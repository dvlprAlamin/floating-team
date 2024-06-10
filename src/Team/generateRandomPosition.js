// generatePositions.js
const generateRandomPosition = (existingPositions, imageSize, spacing) => {
    let position;
    let collision;

    do {
        collision = false;
        position = [
            Math.random() * 20 - 10,  // Random X
            Math.random() * 20 - 10,  // Random Y
            Math.random() * 20 - 10   // Random Z
        ];

        for (const existingPosition of existingPositions) {
            const distance = Math.sqrt(
                (position[0] - existingPosition[0]) ** 2 +
                (position[1] - existingPosition[1]) ** 2 +
                (position[2] - existingPosition[2]) ** 2
            );

            if (distance < imageSize + spacing) {
                collision = true;
                break;
            }
        }
    } while (collision);

    return position;
};

const generatePositions = (count, imageSize, spacing) => {
    const positions = [];

    for (let i = 0; i < count; i++) {
        positions.push(generateRandomPosition(positions, imageSize, spacing));
    }

    return positions;
};

export default generatePositions;
