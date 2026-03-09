/**
 * LOSOS — Linked Objects OS
 * 3KB gzipped linked data pane framework
 * https://linkedobjects.org
 * Copyright (c) 2026 Melvin Carvalho. AGPL-3.0-or-later.
 */
(function(root) {
  'use strict'

  // === LION Store ===

  class Store {
    constructor() { this.nodes = new Map() }

    load(jsonLd) {
      const ctx = jsonLd['@context'] || {}
      this._index(jsonLd, ctx)
      return this
    }

    _index(obj, ctx, parent) {
      if (!obj || typeof obj !== 'object') return
      if (Array.isArray(obj)) { obj.forEach(function(o) { this._index(o, ctx, parent) }.bind(this)); return }

      var id = obj['@id'] || (parent ? parent + '/' + Math.random().toString(36).slice(2, 6) : '#this')
      if (!obj['@id']) obj['@id'] = id
      var node = Object.assign({ '@id': id }, obj)

      if (node['@type']) node['@type'] = this._expand(node['@type'], ctx)

      var keys = Object.keys(node)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i], val = node[key]
        if (key.charAt(0) === '@') continue
        var expanded = this._expand(key, ctx)
        if (expanded !== key) { node[expanded] = val; delete node[key] }
        if (val && typeof val === 'object' && !Array.isArray(val)) this._index(val, ctx, id)
        if (Array.isArray(val)) {
          for (var j = 0; j < val.length; j++) {
            if (val[j] && typeof val[j] === 'object') this._index(val[j], ctx, id)
          }
        }
      }
      this.nodes.set(id, node)
    }

    _expand(term, ctx) {
      var colon = term.indexOf(':')
      if (colon === -1) return term
      var prefix = term.slice(0, colon), local = term.slice(colon + 1)
      if (ctx[prefix]) return ctx[prefix] + local
      return term
    }

    get(id) { return this.nodes.get(id) || null }

    prop(id) {
      var node = typeof id === 'string' ? this.get(id) : id
      if (!node) return undefined
      var keys = Array.prototype.slice.call(arguments, 1)
      for (var i = 0; i < keys.length; i++) {
        var entries = Object.entries(node)
        for (var j = 0; j < entries.length; j++) {
          var k = entries[j][0], v = entries[j][1]
          if (k === '@id' || k === '@type' || k === '@context') continue
          if (k.indexOf(keys[i]) !== -1) return v
        }
      }
      return undefined
    }

    propAll(id, key) {
      var val = this.prop(id, key)
      if (val === undefined) return []
      return Array.isArray(val) ? val : [val]
    }

    type(id) {
      var node = typeof id === 'string' ? this.get(id) : id
      return node && node['@type'] || null
    }

    find(fn) {
      var results = []
      this.nodes.forEach(function(node) { if (fn(node)) results.push(node) })
      return results
    }

    statementsMatching(subject, predicate, object) {
      var node = typeof subject === 'string' ? this.get(subject)
        : subject && subject.value ? this.get(subject.value) : null
      if (!node) return []

      var stmts = []
      var entries = Object.entries(node)
      for (var i = 0; i < entries.length; i++) {
        var key = entries[i][0], val = entries[i][1]
        if (key.charAt(0) === '@' && key !== '@type') continue
        var predUri = key === '@type'
          ? 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' : key
        var values = Array.isArray(val) ? val : [val]
        for (var j = 0; j < values.length; j++) {
          var v = values[j]
          var obj = typeof v === 'object' && v['@id']
            ? { termType: 'NamedNode', value: v['@id'] }
            : { termType: 'Literal', value: String(v) }
          stmts.push({
            subject: { termType: 'NamedNode', value: node['@id'] },
            predicate: { termType: 'NamedNode', value: predUri },
            object: obj
          })
        }
      }
      return stmts
    }
  }

  function createStore(source) {
    var store = new Store()
    if (typeof source === 'string') source = JSON.parse(source)
    store.load(source)
    return store
  }

  // === Shell ===

  async function loadPanes() {
    var panes = []
    var els = document.querySelectorAll('script[data-pane]')
    for (var i = 0; i < els.length; i++) {
      try {
        var mod = await import(els[i].src)
        if (mod.default && mod.default.render) panes.push(mod.default)
      } catch (err) { console.warn('Failed to load pane:', els[i].src, err) }
    }
    return panes
  }

  async function loadData() {
    var srcEls = document.querySelectorAll('script[type="application/ld+json"][src]')
    for (var i = 0; i < srcEls.length; i++) {
      try {
        var res = await fetch(srcEls[i].src + '?t=' + Date.now(), { cache: 'no-store' })
        srcEls[i].textContent = await res.text()
      } catch (err) { console.warn('Failed to fetch data:', srcEls[i].src, err) }
    }

    var store = new Store()
    var dataEls = document.querySelectorAll('script[type="application/ld+json"]')
    for (var i = 0; i < dataEls.length; i++) {
      if (!dataEls[i].textContent.trim()) continue
      try { store.load(JSON.parse(dataEls[i].textContent)) }
      catch (err) { console.warn('Failed to parse data island:', err) }
    }
    return store
  }

  function findSubject(store) {
    var hashThis = store.get('#this')
    if (hashThis) return { termType: 'NamedNode', value: '#this' }
    for (var entry of store.nodes) {
      if (entry[1]['@type']) return { termType: 'NamedNode', value: entry[0] }
    }
    return null
  }

  function renderTabs(panes, container, subject, store) {
    var tabBar = document.createElement('div')
    tabBar.id = 'pane-tabs'
    tabBar.style.cssText = 'display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,0.08);overflow-x:auto;max-width:960px;margin:0 auto'

    var content = document.createElement('div')
    content.id = 'pane-container'
    content.style.cssText = 'max-width:960px;margin:0 auto'

    var selectPane = function(pane, tab) {
      content.innerHTML = ''
      for (var i = 0; i < tabBar.children.length; i++) {
        tabBar.children[i].setAttribute('aria-selected', 'false')
        tabBar.children[i].style.borderBottomColor = 'transparent'
        tabBar.children[i].style.color = 'rgba(255,255,255,0.5)'
      }
      tab.setAttribute('aria-selected', 'true')
      tab.style.borderBottomColor = '#7c3aed'
      tab.style.color = 'rgba(255,255,255,0.9)'
      pane.render(subject, store, content)
    }

    var first = null
    for (var i = 0; i < panes.length; i++) {
      var pane = panes[i]
      try { if (!pane.canHandle(subject, store)) continue }
      catch(e) { continue }

      var tab = document.createElement('button')
      tab.className = 'pane-tab'
      tab.setAttribute('aria-selected', 'false')
      tab.style.cssText = 'border:none;background:none;padding:10px 18px;cursor:pointer;font:600 0.85em/1.4 -apple-system,sans-serif;color:rgba(255,255,255,0.5);border-bottom:2px solid transparent;white-space:nowrap'
      tab.textContent = (pane.icon ? pane.icon + ' ' : '') + pane.label
      tab.addEventListener('click', selectPane.bind(null, pane, tab))
      tabBar.appendChild(tab)
      if (!first) first = { pane: pane, tab: tab }
    }

    container.appendChild(tabBar)
    container.appendChild(content)
    if (first) selectPane(first.pane, first.tab)
  }

  async function boot(el) {
    var rootEl = el || document.getElementById('losos') || document.body
    var results = await Promise.all([loadPanes(), loadData()])
    var panes = results[0], store = results[1]
    var subject = findSubject(store)

    if (!subject) {
      rootEl.innerHTML = '<p style="padding:2em;color:#888">No data found.</p>'
      return
    }
    renderTabs(panes, rootEl, subject, store)
  }

  // === Export ===

  var LOSOS = { Store: Store, createStore: createStore, boot: boot }

  // Module export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LOSOS
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return LOSOS })
  }

  // Always attach to global
  root.LOSOS = LOSOS

  // Auto-boot
  if (typeof document !== 'undefined' && document.getElementById('losos')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() { boot() })
    } else {
      boot()
    }
  }

})(typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this);
