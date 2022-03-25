
let map = []
let score = 0
let person = [0, 0]
const BONUS_SCORE = 10
const BONUS_COUNT = 10
const MAP_SIZE = { width: 10, height: 10 }
const IMAGE_RESOURCES = {}
const IMAGES = [
    { name: 'robot', url: '../image/robot.svg' },
    { name: 'prize', url: '../image/prize.svg' },
    // { name: 'grass', url: '../image/grass.svg' },
    { name: 'boom', url: '../image/boom.svg' }
]
const initMap = (size, count, score) => {
    const map = []
    const bonusRecord = initBonus(size, count);

    for (let row = 0; row < size.width; row++) {
        const rowItem = [];

        for (let col = 0; col < size.height; col++) {
            if (!isInRecord([row, col], bonusRecord)) {
                rowItem.push(null)
                continue;
            }

            rowItem.push({
                bonus: score
            })
        }
        map.push(rowItem)
    }
    return map
}
const initBonus = (size, count) => {
    const record = [];
    while (record.length < count) {
        const row = Math.floor(Math.random() * size.width);
        const col = Math.floor(Math.random() * size.height);

        if ((row === 0 && col === 0) || isInRecord([row, col], record)) {
            continue;
        }
        record.push([row, col])
    }
    return record

}
const drawMap = (map) => {
    const mapContainer = document.getElementsByClassName("map")[0];
    mapContainer.innerHTML = ''
    for (let [rowIndex, row] of map.entries()) {
        const rowEl = document.createElement('div')
        rowEl.className = 'row'
        for (let [colIndex, col] of row.entries()) {
            const colEl = document.createElement('div')
            colEl.className = 'cell'

            const isBounsCell = isBouns(col)
            const isPersonCell = isEqualVector(person, [rowIndex, colIndex])

            drawCellWithImage(colEl, { map, rowIndex, colIndex, col }, { isBounsCell, isPersonCell })
            rowEl.appendChild(colEl)
        }
        mapContainer.appendChild(rowEl)
    }

}
const drawCellWithImage = (container, { map, rowIndex, colIndex, col }, { isBounsCell, isPersonCell }) => {
    if (isPersonCell) {
        const person = createImageContainer();
        person.appendChild(createImage(IMAGE_RESOURCES.robot))
        container.appendChild(person)
    }
    if (isBounsCell) {
        if (isPersonCell) {
            score += col.bonus
            map[rowIndex][colIndex] = null
        } else {
            const bonus = createImageContainer();
            bonus.appendChild(createImage(IMAGE_RESOURCES.prize))
            container.appendChild(bonus)
        }
    }
}
const move = (timer) => (e) => {
    const [y, x] = person
    switch (e.code) {
        case 'ArrowRight':
            person = [y, Math.min(x + 1, MAP_SIZE.width - 1)];
            break;
        case 'ArrowUp':
            person = [Math.max(y - 1, 0), x];
            break;
        case 'ArrowDown':
            person = [Math.min(y + 1, MAP_SIZE.height - 1), x];
            break;
        case 'ArrowLeft':
            person = [y, Math.max(x - 1, 0)];
            break;
        default:
            return;
    }

    drawMap(map)

    const scoreEl = document.getElementsByClassName('score')[0];
    scoreEl.innerHTML = `当前分数: ${score}`

    setTimeout(() => {
        if (isBounsEmpty(map)) {
            alert('Game Complete')
            clearInterval(timer)
        }
    }, 0)
}
const startGame = (time = 8) => {
    const timerEl = document.getElementsByClassName('timer')[0]
    let curTime = time
    timerEl.innerHTML = `剩余时间: ${curTime}s`
    const scoreEl = document.getElementsByClassName('score')[0]
    scoreEl.innerHTML = `当前分数: ${score}s`
    const timer = setInterval(() => {
        if (curTime <= 0) {
            alert('Game Over')
            clearInterval(timer)
            return
        }
        curTime--
        timerEl.innerHTML = `剩余时间: ${curTime}s`
    }, 1000)
    document.addEventListener('keydown', move(timer))
}
const isEqualVector = (a, b) => a[0] === b[0] && a[1] === b[1]
const isInRecord = (pos, record) => record.some(x => isEqualVector(x, pos))
const isBouns = (item) => item && typeof item.bonus == 'number'
const isPerson = (item) => item && item.person
const isBounsEmpty = (map) => map.every(row => row.every(col => !isBouns(col)))
const createImage = (url) => {
    const image = new Image();
    image.src = url;
    return image
}

const createImageContainer = () => {
    const container = document.createElement('div')
    container.className = 'image-container'
    return container
}

const loadImage = ({ name, url }) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;

        image.onload = () => resolve({ name, url })
        image.onerror = () => reject(url)
    })
}

const loadImages = async () => {
    const images = await Promise.all(IMAGES.map(loadImage))
    for (let { name, url } of images) {
        IMAGE_RESOURCES[name] = url
    }
}
const main = async () => {
    map = initMap(MAP_SIZE, BONUS_COUNT, BONUS_SCORE)
    console.log(map)

    await loadImages()
    drawMap(map)

}
main()