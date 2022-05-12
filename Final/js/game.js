document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let cells = []
    let score = 0

    //创建网格
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            //create grid cells
            cell = document.createElement('div')
            cell.innerHTML = 0;
            gridDisplay.appendChild(cell)
            // console.log('yes')
            cells.push(cell)
        }
        generateNumber()
        generateNumber()
    }
    createBoard()


    //根据元素显示颜色
    var timer = setInterval(changeColor = () => {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 0) {
                cells[i].style.backgroundColor = '#afa192'
                cells[i].style.backgroundImage = ''
            }
            else if (cells[i].innerHTML == 2) {
                //cells[i].style.backgroundColor = '#eee4da'
                cells[i].style.backgroundImage = 'url("../img/NJU.png")'
                // cells[i].style.background = 'rgba(238, 228, 218, 0.2)'
                //cells[i].appendChild('img')
            }
            else if (cells[i].innerHTML == 4) {
                cells[i].style.backgroundColor = '#ede0c8'
                cells[i].style.backgroundImage = 'url("../img/HIT.png")'
            }
            else if (cells[i].innerHTML == 8) {
                cells[i].style.backgroundColor = '#f2b179'
                cells[i].style.backgroundImage = 'url("../img/NKU.png")'
            }
            else if (cells[i].innerHTML == 16) {
                cells[i].style.backgroundColor = '#ffcea4'
                cells[i].style.backgroundImage = 'url("../img/TJU.png")'
            }
            else if (cells[i].innerHTML == 32) {
                cells[i].style.backgroundColor = '#e8c064'
                cells[i].style.backgroundImage = 'url("../img/ZJU.png")'
            }
            else if (cells[i].innerHTML == 64) {
                cells[i].style.backgroundColor = '#ffab6e'
                cells[i].style.backgroundImage = 'url("../img/USTC.png")'
            }
            else if (cells[i].innerHTML == 128) {
                cells[i].style.backgroundColor = '#fd9982'
                cells[i].style.backgroundImage = 'url("../img/RUC.png")'
            }
            else if (cells[i].innerHTML == 256) {
                cells[i].style.backgroundColor = '#ead79c'
                cells[i].style.backgroundImage = 'url("../img/PKU.png")'
            }
            else if (cells[i].innerHTML == 512) {
                cells[i].style.backgroundColor = '#76daff'
                cells[i].style.backgroundImage = 'url("../img/THU.png")'
            }
            else if (cells[i].innerHTML == 1024) {
                cells[i].style.backgroundColor = '#beeaa5'
                cells[i].style.backgroundImage = 'url("../img/FDU.jpeg")'
            }
            else if (cells[i].innerHTML == 2048) {
                cells[i].style.backgroundColor = '#d7d4f0'
                cells[i].style.backgroundImage = 'url("../img/SJTU.png")'
            }
        }
    }, 50)
    changeColor()

    //随机生成数字2
    function generateNumber() {
        randomIndex = Math.floor(Math.random() * cells.length)
        if (cells[randomIndex].innerHTML == 0) {
            cells[randomIndex].innerHTML = 2
            checkLose()
        } else {
            generateNumber()
        }
    }

    //将元素移动至右边
    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let colOne = cells[i].innerHTML
                let colTwo = cells[i + 1].innerHTML
                let colThree = cells[i + 2].innerHTML
                let colFour = cells[i + 3].innerHTML
                //将字符串转化为整数
                let row = [parseInt(colOne), parseInt(colTwo), parseInt(colThree), parseInt(colFour)]
                // console.log(row)

                //提取非零元素，重新组合
                let nonZeroRow = row.filter(item => item)
                // console.log(nonZeroRow)
                let blankNum = 4 - nonZeroRow.length
                let zeroArr = new Array(blankNum).fill(0)
                // console.log(zeroArr)
                let newRow = zeroArr.concat(nonZeroRow)
                // console.log(newRow)

                //更新数字
                cells[i].innerHTML = newRow[0]
                cells[i + 1].innerHTML = newRow[1]
                cells[i + 2].innerHTML = newRow[2]
                cells[i + 3].innerHTML = newRow[3]
            }
        }
    }

    //将元素移动至左边
    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 3) {
                let colOne = cells[i].innerHTML
                let colTwo = cells[i - 1].innerHTML
                let colThree = cells[i - 2].innerHTML
                let colFour = cells[i - 3].innerHTML
                //将字符串转化为整数
                let row = [parseInt(colOne), parseInt(colTwo), parseInt(colThree), parseInt(colFour)]
                // console.log(row)

                //提取非零元素，重新组合
                let nonZeroRow = row.filter(item => item)
                // console.log(nonZeroRow)
                let blankNum = 4 - nonZeroRow.length
                let zeroArr = new Array(blankNum).fill(0)
                // console.log(zeroArr)
                let newRow = nonZeroRow.concat(zeroArr)
                // console.log(newRow)

                //更新数字
                cells[i].innerHTML = newRow[3]
                cells[i - 1].innerHTML = newRow[2]
                cells[i - 2].innerHTML = newRow[1]
                cells[i - 3].innerHTML = newRow[0]
            }
        }
    }
    // moveLeft()

    //将元素移动至下边
    function moveDown() {
        for (let i = 0; i < width; i++) {
            let rowOne = cells[i].innerHTML
            let rowTwo = cells[i + width].innerHTML
            let rowThree = cells[i + width * 2].innerHTML
            let rowFour = cells[i + width * 3].innerHTML
            let column = [parseInt(rowOne), parseInt(rowTwo), parseInt(rowThree), parseInt(rowFour)]

            let nonZeroColumn = column.filter(item => item)
            let blankNum = 4 - nonZeroColumn.length
            let zeroArr = new Array(blankNum).fill(0)
            let newColumn = zeroArr.concat(nonZeroColumn)

            cells[i].innerHTML = newColumn[0]
            cells[i + width].innerHTML = newColumn[1]
            cells[i + width * 2].innerHTML = newColumn[2]
            cells[i + width * 3].innerHTML = newColumn[3]
        }
    }

    //将元素移动至下边
    function moveUp() {
        for (let i = 0; i < width; i++) {
            let rowOne = cells[i].innerHTML
            let rowTwo = cells[i + width].innerHTML
            let rowThree = cells[i + width * 2].innerHTML
            let rowFour = cells[i + width * 3].innerHTML
            let column = [parseInt(rowOne), parseInt(rowTwo), parseInt(rowThree), parseInt(rowFour)]

            let nonZeroColumn = column.filter(item => item)
            let blankNum = 4 - nonZeroColumn.length
            let zeroArr = new Array(blankNum).fill(0)
            let newColumn = nonZeroColumn.concat(zeroArr)

            cells[i].innerHTML = newColumn[0]
            cells[i + width].innerHTML = newColumn[1]
            cells[i + width * 2].innerHTML = newColumn[2]
            cells[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function mergeRow() {
        for (let i = 0; i < width * width - 1; i++) {
            if (cells[i].innerHTML == cells[i + 1].innerHTML) {
                let mergedNumber = parseInt(cells[i].innerHTML) * 2
                cells[i].innerHTML = mergedNumber
                cells[i + 1].innerHTML = 0
                score += mergedNumber
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }

    function mergeColumn() {
        for (let i = 0; i < width * (width - 1); i++) {
            if (cells[i].innerHTML == cells[i + width].innerHTML) {
                let mergedNumber = parseInt(cells[i].innerHTML) * 2
                cells[i].innerHTML = mergedNumber
                cells[i + width].innerHTML = 0
                score += mergedNumber
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }

    //绑定按键事件
    document.addEventListener('keyup', control = (event) => {
        switch (event.code) {
            case 'ArrowRight':
                swipeRight()
                break
            case 'ArrowLeft':
                swipeLeft()
                break
            case 'ArrowDown':
                swipeDown()
                break
            case 'ArrowUp':
                swipeUp()
                break
        }
    })

    function swipeRight() {
        moveRight()
        mergeRow()
        moveRight()
        generateNumber()
    }

    function swipeLeft() {
        moveLeft()
        mergeRow()
        moveLeft()
        generateNumber()
    }

    function swipeDown() {
        moveDown()
        mergeColumn()
        moveDown()
        generateNumber()
    }

    function swipeUp() {
        moveUp()
        mergeColumn()
        moveUp()
        generateNumber()
    }

    //检查游戏是否胜利
    function checkWin() {
        for (let i = 0; i < width * width; i++) {
            if (cells[i].innerHTML == 2048) {
                resultDisplay.innerHTML = '你获胜了'
                document.removeEventListener('keyup', control)
            }
        }
    }

    //检查是否失败，即是否有空位
    function checkLose() {
        let zeros = 0
        for (let i = 0; i < width * width; i++) {
            if (cells[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = '你输了'
            document.removeEventListener('keyup', control)
        }
    }


})