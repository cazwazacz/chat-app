module.exports = function(model, name, body) {
  model.create({name: name, body: body}, function(err, message) {
    if (err) { return console.log(err) };
  })
}
