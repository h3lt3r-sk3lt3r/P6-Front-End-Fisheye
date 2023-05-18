const modal = document.getElementById('contact_modal')
const body = document.getElementsByTagName('body')[0]

function displayModal () {
  body.style.position = 'fixed'
  modal.style.display = 'block'
  modal.focus()
}

function closeModal () {
  modal.style.display = 'none'
  body.style.position = null
}

document.getElementById('contact_close').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    closeModal()
  }
})

modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
})

const inputs = document.querySelectorAll('.contact_input')
const contactModal = document.getElementById('contact_modal')

let firstname
let lastname
let email
let message

inputs.forEach((input) => {
  input.addEventListener('focusout', () => {
    if (input.name == 'firstname') {
      firstname = document.getElementById('firstname').value
    } else if (input.name == 'lastname') {
      lastname = document.getElementById('lastname').value
    } else if (input.name == 'email') {
      email = document.getElementById('email').value
    } else if (input.name == 'message') {
      message = document.getElementById('message').value
    }
  })
})

contactModal.addEventListener('submit', (event) => {
  event.preventDefault()

  console.log('Prénom : ' + firstname)
  console.log('Nom : ' + lastname)
  console.log('Email : ' + email)
  console.log('Message : ' + message)

  inputs.forEach((input) => {
    input.value = ''
  })

  closeModal()
})
