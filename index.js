const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

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
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 3
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'blue'
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player()
const projectile = []
const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()

    projectile.forEach((projectile , index )=> {
        if (projectile.position.y + projectile.radius <= 0){
            setTimeout(()=>{
                projectile.splice(index ,1)
            },0)
        }
        else{
            projectile.update()
        }
        projectile.update()
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
    }
    else if (keys.d.pressed && (player.position.x + player.width) <= canvas.width) {
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
            projectile.push(new Projectile({
                position: {
                    x: player.position.x+player.width/2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
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

