/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'butt': '#574699',
        'coolgreen': '#94825F',
        'blackish' : '#232526'
      },
      boxShadow: {
        'cool-effect': '0 5px 0 #58a700',
        'cool-effect2': '0 0 0 #58a700',
      },
      backgroundImage: {
        'idk': 'url(https://images.pexels.com/photos/350749/pexels-photo-350749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        'idk2': 'url(https://images.pexels.com/photos/1601774/pexels-photo-1601774.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        'idk3': 'url(https://r1.ilikewallpaper.net/ipad-wallpapers/download-103923/abstract-lightning-effect-4k_2732x2732.jpg)',
        'idk4': 'url(https://i.pinimg.com/originals/8e/4e/51/8e4e512c33592690f2695a50ec13481c.png)',
        'idk5': 'url(https://garden.spoonflower.com/c/10875479/p/f/m/lSX4I-jgmB8K9wDUBzxi526l9EkAki9hACMiUKs9AHwocw--4Yf3qJ5n8Q/Arcade%20Floor%20Galaxy.jpg)',
        'gameover' : 'url(https://image.shutterstock.com/image-vector/neon-illustration-arcade-game-machine-260nw-1730840356.jpg)'
      }
    },
  },
  plugins: [],
}
