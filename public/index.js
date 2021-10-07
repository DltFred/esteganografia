const d = document
import { desencriptar, encriptar, keys } from './js/rsa.js'


const cargarImagen = () => {
  const file = d.getElementById('file')
  file.addEventListener('change', (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      const canvas = d.getElementById('entradaImg')
      const context = canvas.getContext('2d')
      const img = new Image()
      img.width = 50
      img.height = 50
      img.src = e.target.result
      img.onload = () => {
        context.drawImage(img, 0, 0)
      }
    }
    reader.readAsDataURL(file)
  })
}


d.addEventListener('DOMContentLoaded', () => {
  keys()
  encriptar()
  desencriptar()
  cargarImagen()
}
)

d.addEventListener('click', (e) => {
  if (e.target.matches('#descargar')) {
    descargarImagen()
  }

  function descargarImagen() {
    const canvas = document.getElementById("salidaImg")
    let imagen = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    const a = d.getElementById('descargar')
    a.href = imagen
    a.download = 'imagenCifrado.png'
  }
})