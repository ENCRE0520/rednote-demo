import assert from 'node:assert/strict'
import { initialPostNavigation, postNavigationReducer } from '../src/post-navigation.js'

const originalPost = { frameKey: 'home-post:1', post: { id: 'home-post' }, phase: 'open', scrollTop: 318 }
const community = { id: 'color-club' }
const followedIds = { [community.id]: false }

// Home post → community → community note → back to community → back to post.
let state = initialPostNavigation
state = postNavigationReducer(state, { type: 'open-post', flight: originalPost })
state = postNavigationReducer(state, { type: 'open-community', topic: community })
assert.equal(state.topic, community)
assert.equal(state.flight, originalPost)
assert.equal(followedIds[community.id], false)

const communityNote = { frameKey: 'community-note:2', post: { id: 'community-note' }, phase: 'open' }
state = postNavigationReducer(state, { type: 'open-post', flight: communityNote, preservePost: true })
assert.deepEqual(state.postStack, [originalPost])
assert.equal(state.flight, communityNote)

state = postNavigationReducer(state, { type: 'close-flight' })
assert.equal(state.topic, community)
assert.equal(state.flight, null)
assert.deepEqual(state.postStack, [originalPost])

// The community can contain the same post that opened it; both frames coexist.
const samePost = { frameKey: 'home-post:3', post: { id: 'home-post' }, phase: 'open' }
state = postNavigationReducer(state, { type: 'open-post', flight: samePost })
assert.deepEqual(state.postStack.map(frame => frame.frameKey), ['home-post:1'])
assert.equal(state.flight.frameKey, 'home-post:3')
assert.notEqual(state.postStack[0].frameKey, state.flight.frameKey)

state = postNavigationReducer(state, { type: 'close-flight' })
state = postNavigationReducer(state, { type: 'close-topic' })
assert.equal(state.flight, originalPost)
assert.equal(state.flight.scrollTop, 318)
assert.deepEqual(state.postStack, [])

// A duplicate post ID still yields distinct, stable frame keys.
assert.notEqual(originalPost.frameKey, samePost.frameKey)
assert.equal(state.flight.frameKey, originalPost.frameKey)
assert.equal(followedIds[community.id], false)

// Direct topic entry still does not create a suspended post frame.
state = postNavigationReducer(initialPostNavigation, { type: 'open-topic', topic: community })
state = postNavigationReducer(state, { type: 'close-topic' })
assert.equal(state.topic, null)
assert.equal(state.postStack.length, 0)
