import { mostrarMensaje, ocultarMensaje } from './esteganografia.js'

const d = document,
  $exponente = d.getElementById('exponente'),
  $privateKey = d.getElementById('privateKey'),
  $publicKey = d.getElementById('publicKey'),
  $mensaje = d.getElementById('mensaje')

export function keys() {
  d.addEventListener('click', (e) => {
    if (!e.target.matches('#btnGenerar')) return false
    generarKeys()
  })
}

export function encriptar() {
  d.addEventListener('click', e => {
    if (!e.target.matches('#btnEncriptar')) return false
    encriptarMensaje()
    const ok = ocultarMensaje(`${$publicKey.value}${$mensaje.value}`)
    console.log(ok)
    if (ok != null) {
      d.getElementById('descargar').classList.remove('is-active')
    }
  })
}

export function desencriptar() {
  d.addEventListener('click', e => {
    if (!e.target.matches('#btnDesencriptar')) return false
    const mensaje = mostrarMensaje()
    console.log('Mensaje oculto en la imagen:', mensaje)
    const keyPublic = mensaje.slice(0, 128)
    const mensajeRecuperado = mensaje.slice(128, 257)
    console.log('Llave publica obtenida:', keyPublic)
    console.log('Mensaje recuperado:', mensajeRecuperado)
    $publicKey.value = keyPublic
    $mensaje.value = desencriptarMensaje(mensajeRecuperado)
  })
}


function desencriptarMensaje(mensaje) {
  const rsa = new RSAKey()
  rsa.setPrivate(`${$publicKey.value}`, `${$exponente.value}`, `${$privateKey.value}`)
  return rsa.decrypt(mensaje)
}

function encriptarMensaje() {
  const rsa = new RSAKey()
  rsa.setPublic(`${$publicKey.value}`, `${$exponente.value}`)
  $mensaje.value = linebrk(rsa.encrypt(`${$mensaje.value}`), 64)
}

function generarKeys() {
  const rsa = new RSAKey() /* rsa.js */
  if (!$exponente.value) return alert('Ingresa un valor a E')
  rsa.generate('512', $exponente.value)
  console.log('Seteamos las keys al objeto RSA: ', rsa)
  $privateKey.value = rsa.d.toString(16)
  $publicKey.value = rsa.n.toString(16)
}