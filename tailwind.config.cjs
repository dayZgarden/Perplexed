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
        'cool': '5px 7px 0px 0px rgb(17 24 49)',
        'cool2' : '5px 7px 5px 0px rgb(17 24 49)',
        'cool-effect': '0 5px 0 #58a700',
        'cool-effect2': '0 0 0 #58a700',
      },
      backgroundImage: {
        'idk': 'url(https://images.pexels.com/photos/350749/pexels-photo-350749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        'idk2': 'url(https://images.pexels.com/photos/1601774/pexels-photo-1601774.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        'idk3': 'url(https://r1.ilikewallpaper.net/ipad-wallpapers/download-103923/abstract-lightning-effect-4k_2732x2732.jpg)',
        'idk4': 'url(https://i.pinimg.com/originals/8e/4e/51/8e4e512c33592690f2695a50ec13481c.png)',
        'idk5': 'url(https://images.pexels.com/photos/4835419/pexels-photo-4835419.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        'gameover' : 'url(https://image.shutterstock.com/image-vector/neon-illustration-arcade-game-machine-260nw-1730840356.jpg)',
        'general' : 'url(https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/12/23173546/Basic-General-Knowledge-for-Competitive-Exams-.jpg)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
