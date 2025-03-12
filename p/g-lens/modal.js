// modal.js
export class Modal {
  constructor(modalElement) {
    if (!modalElement) throw new Error('Modal element is required.')
    this.modal = modalElement
  }

  show() {
    this.modal.classList.remove('hidden')
  }

  hide() {
    this.modal.classList.add('hidden')
  }

  toggle() {
    this.modal.classList.toggle('hidden')
  }
}
