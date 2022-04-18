const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
    constructor() {


        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = "./images/spaceship.png"

        image.onload = () => {
            const scale = .15
            this.image = image
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

    }

    draw() {
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

const player = new Player()
const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },
    space: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
    }
    else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
    }
    else {
        player.velocity.x = 0
    }
}
animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
            break;
        case 'd':
            console.log('right')
            player.velocity.x += 5
            keys.d.pressed = true
            break;
        case ' ':
            console.log('space')
            keys.space.pressed = true
            break;

    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = false
            break;
        case 'd':
            console.log('right')
            player.velocity.x += 5
            keys.d.pressed = false
            break;
        case ' ':
            console.log('space')
            keys.space.pressed = false
            break;

    }
})

