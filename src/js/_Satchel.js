class Satchel {
  #id

  constructor(id = null, options = {}) {
    this.#id = id
    this.settings = { data: undefined, expiry: null, creation: null }
    this.settings = { ...this.settings, ...options }

    if (!this.#id) throw new Error('Satchel needs an ID for this store.')

    // sessionStorage or localStorage
    this.storage = this.settings.storage ? sessionStorage : localStorage

    // Create inital storage object
    if (this.settings.data) {
      this.set(this.settings.data, this.settings.expery)
    }
  }

  set(data, expery = null) {
    this.storage.setItem(
      this.#id,
      JSON.stringify({
        data: data || null,
        expery: expery || this.settings.expiry || null,
        creation: Date.now()
      })
    )
  }

  get(ignore = false) {
    const store = JSON.parse(this.storage.getItem(this.#id))
    if (this.isValid() && !ignore) {
      return store
    } else if (ignore) {
      return store
    }
  }

  destroy() {
    this.storage.removeItem(this.#id)
  }

  isValid() {
    const store = JSON.parse(this.storage.getItem(this.#id))
    return store.expery === null ? true : store.expery - Date.now() > 0
  }

  age() {
    const store = JSON.parse(this.storage.getItem(this.#id))
    return {
      age: store.creation - Date.now(),
      creation: store.creation,
      expery: store.expery,
      expired: this.isValid()
    }
  }
}

export { Satchel }
