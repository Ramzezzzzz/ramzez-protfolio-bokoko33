// создаем объект игры и задаем его размеры
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  });
  
  // функция предзагрузки ресурсов
  function preload() {
    // загружаем изображение для спрайта
    this.load.image('cat', 'https://i.imgur.com/vZ1GqHz.png');
  }
  
  // функция создания объектов игры
  function create() {
    // создаем спрайт
    this.cat = this.physics.add.sprite(400, 300, 'cat');
  }
  
  // функция обновления игры
  function update() {
    // добавляем анимацию спрайту
    this.cat.angle += 1;
  }
  