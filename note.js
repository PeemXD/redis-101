// redis-server
// start redis server

// redis-cli
// connect redis cli

// quit
// disconnect redis cli

//! key-value

// SET key value
// Example
// SET name peem
// add key=name, value=peem into database
// (value base on string)

// GET key

// DEL key

//EXISTS name
// if exist will return 1, if not return 0

// show all key
// KEYS *

// delete all
// flushall

// ttl name
// check ttl(time to live)
// if return -1, it mean no expiration time

// ttl name 10
// set expiration
// or make sure

// setex name 10 peem
// (set-ex)

//! list

// lpush friends john
// lpush friends sally
// add to head list

// rpush friends sally
// add to tail list

// lrange friends 0 -1
// get list start index 0 to -1 == get all

// lpop friends
// pop head

// rpop friends
// pop tail

// ! set == unique list

// sadd hobbies "weight lifting"
// (set-add)
// add to set
// if add success will return 1
// if cannot add because already exist will return 0

// smembers hobbies
// (set-member)

// srem hobbies "weight lifting"
// (set-remove)

//! hash

// hset person name peem
// hset person age 26

// hget person name
// hget person age
// get value of name in person

// hgetall person
// get key and value in person

// hdel person age
// delete key, value will be delete

// hexists person name
// check have key if exist will return 1

////////////////////

// npm init -y
// npm install express axios cors
// node server.js
// npm i redis@3.1.2

//! convention in redis must specify namespace like this `photos:XXX` use ":"
