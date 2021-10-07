const d = document
const imgEntrada = d.getElementById('entradaImg'),
  imgSalida = d.getElementById('salidaImg'),
  contextEntrada = imgEntrada.getContext('2d'),
  contextSalida = imgSalida.getContext('2d')

export function ocultarMensaje(mensaje) {
  const imageData = contextEntrada.getImageData(0, 0, imgEntrada.width, imgEntrada.height),
    pixels = imageData.data

  let stringBin = binario(mensaje)
  console.log('LSB a remplazar: ', stringBin.length)
  for (let i = 0; i < stringBin.length; i++) {
    let r = pixels[i * 4]
    pixels[i * 4] = r % 2 == stringBin[i] ? r : changeLSB(r)
  }
  contextSalida.putImageData(imageData, 0, 0)
  return 'Mensaje oculto: OK'
}

export function mostrarMensaje() {
  const imageData = contextEntrada.getImageData(0, 0, imgEntrada.width, imgEntrada.height),
    pixels = imageData.data
  let longitud = 2056
  let stringBin = ''
  for (let i = 0; i < longitud; i++) {
    let r = pixels[i * 4] % 2
    stringBin += r
  }
  let newBin = ''
  for (var i = 0; i < stringBin.length; i++) {
    newBin += (i % 8 == 0 && i != 0) ? ` ${stringBin[i]}` : `${stringBin[i]}`
  }
  console.log('Binarios recuperados de la imagen: ', newBin)
  var binString = ''
  newBin.split(' ').map(function (bin) {
    binString += String.fromCharCode(parseInt(bin, 2))
  })
  return binString
}

function changeLSB(num) {
  if (num % 2 == 0)//LSB 0
    return num + 1
  else // LSB 1
    return num - 1
}

function binario(text) {
  let res = []
  let cadena = ''
  text.split('').forEach(function (letter) { //  hace un array con cada caracter y lo itera
    let bin = letter.charCodeAt(0).toString(2)// PENDIENTE, toString(2) why, aqui convierte a ASCII
    let padding = 8 - bin.length //funciona con espacios
    let binario = new Array(padding + 1).join('0') + bin
    res.push(binario)
    cadena += binario
  })
  console.log(`binarios a reemplazar en LSB`, cadena)
  return cadena
}
